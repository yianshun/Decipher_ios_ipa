/****************************************************************************
 Copyright (c) 2010-2013 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#import "AppController.h"
#import "cocos2d.h"
#import "AppDelegate.h"
#import "RootViewController.h"
#import "SDKWrapper.h"
#import "platform/ios/CCEAGLView-ios.h"
#import <AnyThinkSDK/AnyThinkSDK.h>
#import <AnyThinkSplash/AnyThinkSplash.h>
#import <AnyThinkRewardedVideo/AnyThinkRewardedVideo.h>
#import <AnyThinkBanner/AnyThinkBanner.h>
#import <AppTrackingTransparency/AppTrackingTransparency.h>
#include <cocos/scripting/js-bindings/jswrapper/SeApi.h>


using namespace cocos2d;

@interface AppController()<ATSplashDelegate, ATRewardedVideoDelegate, ATBannerDelegate>
@end

@implementation AppController

Application* app = nullptr;
@synthesize window;

-(void) evalString:(NSString *)str
{
    std::string *string = new std::string([str UTF8String]);
    const char *p = string->c_str();
    se::ScriptEngine::getInstance()->evalString(p);
}

- (void)showRewardVideoAd {
    ATCheckLoadModel *checkLoadModel = [[ATAdManager sharedManager] checkRewardedVideoLoadStatusForPlacementID:AT_VIDEO_PID];
    if (checkLoadModel.isReady) {
        [[ATAdManager sharedManager] showRewardedVideoWithPlacementID:AT_VIDEO_PID inViewController:_viewController delegate:self];
    } else {
        [[ATAdManager sharedManager] loadADWithPlacementID:AT_VIDEO_PID extra:@{} delegate:self];
        [self evalString:@"cc.director.emit('fail')"];
    }
}

ATBannerView *_bannerView;
- (void)showBannerAd {
    if ([[ATAdManager sharedManager] bannerAdReadyForPlacementID:AT_BANNER_PID]) {
        _bannerView = [[ATAdManager sharedManager] retrieveBannerViewForPlacementID:AT_BANNER_PID];
        _bannerView.delegate = self;
        _bannerView.presentingViewController = _viewController;
        _bannerView.translatesAutoresizingMaskIntoConstraints = NO;
        [_viewController.view addSubview:_bannerView];
        //Layour banner
        CGFloat width = CGRectGetWidth(_viewController.view.bounds);
        [_viewController.view addConstraint:[NSLayoutConstraint constraintWithItem:_viewController.view attribute:NSLayoutAttributeCenterX relatedBy:NSLayoutRelationEqual toItem:_bannerView attribute:NSLayoutAttributeCenterX multiplier:1.0f constant:.0f]];
        [_viewController.view addConstraint:[NSLayoutConstraint constraintWithItem:_viewController.view attribute:NSLayoutAttributeBottom relatedBy:NSLayoutRelationEqual toItem:_bannerView attribute:NSLayoutAttributeBottom multiplier:1.0f constant:.0f]];
        [_viewController.view addConstraint:[NSLayoutConstraint constraintWithItem:_bannerView attribute:NSLayoutAttributeWidth relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeNotAnAttribute multiplier:1.0f constant:width]];
        [_viewController.view addConstraint:[NSLayoutConstraint constraintWithItem:_bannerView attribute:NSLayoutAttributeHeight relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeNotAnAttribute multiplier:1.0f constant:width/3]];
    } else {
        [self ploadBannerAd];
    }
}

- (void)hideBannerAd {
    [_bannerView removeFromSuperview];
    _bannerView = nil;
    [self ploadBannerAd];
}

#pragma mark -
#pragma mark Application lifecycle

- (void)ploadBannerAd {
    CGFloat width = CGRectGetWidth(_viewController.view.bounds);
    [[ATAdManager sharedManager] loadADWithPlacementID:AT_BANNER_PID extra:@{kATAdLoadingExtraBannerAdSizeKey:[NSValue valueWithCGSize:CGSizeMake(width, width/3)]} delegate:self];
}

- (void)preloadAd {
    [ATAPI integrationChecking];
    if ([[NSUserDefaults standardUserDefaults] objectForKey:@"ran"]) {
        [[ATAdManager sharedManager] loadADWithPlacementID:AT_SPLASH_PID extra:@{kATSplashExtraTolerateTimeoutKey:@5.5} delegate:self];
    } else {
        [[NSUserDefaults standardUserDefaults] setBool:true forKey:@"ran"];
    }
    [[ATAdManager sharedManager] loadADWithPlacementID:AT_VIDEO_PID extra:@{} delegate:self];
    [self ploadBannerAd];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [[SDKWrapper getInstance] application:application didFinishLaunchingWithOptions:launchOptions];
    // Add the view controller's view to the window and display.
    float scale = [[UIScreen mainScreen] scale];
    CGRect bounds = [[UIScreen mainScreen] bounds];
    window = [[UIWindow alloc] initWithFrame: bounds];
    
    // cocos2d application instance
    app = new AppDelegate(bounds.size.width * scale, bounds.size.height * scale);
    app->setMultitouch(true);
    
    // Use RootViewController to manage CCEAGLView
    _viewController = [[RootViewController alloc]init];
#ifdef NSFoundationVersionNumber_iOS_7_0
    _viewController.automaticallyAdjustsScrollViewInsets = NO;
    _viewController.extendedLayoutIncludesOpaqueBars = NO;
    _viewController.edgesForExtendedLayout = UIRectEdgeAll;
#else
    _viewController.wantsFullScreenLayout = YES;
#endif
    // Set RootViewController to window
    if ( [[UIDevice currentDevice].systemVersion floatValue] < 6.0)
    {
        // warning: addSubView doesn't work on iOS6
        [window addSubview: _viewController.view];
    }
    else
    {
        // use this method on ios6
        [window setRootViewController:_viewController];
    }
    
    [window makeKeyAndVisible];
    
    [ATAPI setLogEnabled:YES];
    if (@available(iOS 14, *)) {
        //iOS 14
        [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
            [[ATAPI sharedInstance] startWithAppID:AT_APPID appKey:AT_APPKEY error:nil];
            //to do something，like preloading
            [self preloadAd];
        }];
    } else {
        [[ATAPI sharedInstance] startWithAppID:AT_APPID appKey:AT_APPKEY error:nil];
        [self preloadAd];
    }
    
    [[UIApplication sharedApplication] setStatusBarHidden:YES];
    
    //run the cocos2d-x game scene
    app->start();
    
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    /*
     Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
     Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
     */
    app->onPause();
    [[SDKWrapper getInstance] applicationWillResignActive:application];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    /*
     Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
     */
    app->onResume();
    [[SDKWrapper getInstance] applicationDidBecomeActive:application];
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    /*
     Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
     If your application supports background execution, called instead of applicationWillTerminate: when the user quits.
     */
    [[SDKWrapper getInstance] applicationDidEnterBackground:application];
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    /*
     Called as part of  transition from the background to the inactive state: here you can undo many of the changes made on entering the background.
     */
    [[SDKWrapper getInstance] applicationWillEnterForeground:application];
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    [[SDKWrapper getInstance] applicationWillTerminate:application];
    delete app;
    app = nil;
}


#pragma mark -
#pragma mark Memory management

- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application {
    /*
     Free up as much memory as possible by purging cached data objects that can be recreated (or reloaded from disk) later.
     */
}

#pragma mark -
#pragma mark loading delegate

- (void)didFailToLoadADWithPlacementID:(NSString *)placementID error:(NSError *)error {
    if ([placementID isEqualToString:AT_SPLASH_PID]) {
        NSLog(@"Splash Demo: failed to load:%@", error);
    } else if ([placementID isEqualToString:AT_VIDEO_PID]) {
        NSLog(@"RV Demo: failed to load:%@", error);
    } else if ([placementID isEqualToString:AT_BANNER_PID]) {
        NSLog(@"Banner Demo: failed to load:%@", error);
    }
}

- (void)didFinishLoadingADWithPlacementID:(NSString *)placementID {
    if ([placementID isEqualToString:AT_SPLASH_PID]) {
        NSLog(@"Splash Demo: didFinishLoadingADWithPlacementID");
        ATCheckLoadModel *checkLoadModel = [[ATAdManager sharedManager] checkSplashLoadStatusForPlacementID:AT_SPLASH_PID];
        
        if(checkLoadModel.isReady){
            [[ATAdManager sharedManager] showSplashWithPlacementID:AT_SPLASH_PID window:window delegate:self];
        } else {
            [[ATAdManager sharedManager] loadADWithPlacementID:AT_SPLASH_PID extra:@{kATSplashExtraTolerateTimeoutKey:@5.5} delegate:self];
        }
    } else if ([placementID isEqualToString:AT_VIDEO_PID]) {
        NSLog(@"RV Demo: didFinishLoadingADWithPlacementID");
    } else if ([placementID isEqualToString:AT_BANNER_PID]) {
        NSLog(@"Banner Demo: didFinishLoadingADWithPlacementID");
    }
}

#pragma mark Splash Delegate

- (void)splashDeepLinkOrJumpForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra result:(BOOL)success {
    
}

- (void)splashDidClickForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    
}

- (void)splashDidCloseForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    
}

- (void)splashDidShowForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    
}

- (void)splashZoomOutViewDidClickForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    
}

- (void)splashZoomOutViewDidCloseForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    
}

#pragma mark Reward Video Delegate

- (void)rewardedVideoDidClickForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    
}

- (void)rewardedVideoDidCloseForPlacementID:(NSString *)placementID rewarded:(BOOL)rewarded extra:(NSDictionary *)extra {
    NSLog(@"RV Demo: rewardedVideoDidCloseForPlacementID");
    [[ATAdManager sharedManager] loadADWithPlacementID:AT_VIDEO_PID extra:@{} delegate:self];
}

- (void)rewardedVideoDidDeepLinkOrJumpForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra result:(BOOL)success {
    
}

- (void)rewardedVideoDidEndPlayingForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    
}

- (void)rewardedVideoDidFailToPlayForPlacementID:(NSString *)placementID error:(NSError *)error extra:(NSDictionary *)extra {
    NSLog(@"RV Demo: rewardedVideoDidFailToPlayForPlacementID");
    [self evalString:@"cc.director.emit('fail')"];
}

- (void)rewardedVideoDidRewardSuccessForPlacemenID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"RV Demo: rewardedVideoDidRewardSuccessForPlacemenID");
    [self evalString:@"cc.director.emit('reward')"];
}

- (void)rewardedVideoDidStartPlayingForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    
}

#pragma mark Banner Delegate

- (void)bannerView:(ATBannerView *)bannerView didAutoRefreshWithPlacement:(NSString *)placementID extra:(NSDictionary *)extra {
    
}

- (void)bannerView:(ATBannerView *)bannerView didClickWithPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    
}

- (void)bannerView:(ATBannerView *)bannerView didCloseWithPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"Banner Demo: didCloseWithPlacementID");
    [self ploadBannerAd];
}

- (void)bannerView:(ATBannerView *)bannerView didDeepLinkOrJumpForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra result:(BOOL)success {
    
}

- (void)bannerView:(ATBannerView *)bannerView didShowAdWithPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    
}

- (void)bannerView:(ATBannerView *)bannerView didTapCloseButtonWithPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    
}

- (void)bannerView:(ATBannerView *)bannerView failedToAutoRefreshWithPlacementID:(NSString *)placementID error:(NSError *)error {
    
}

@end
