//
//  BGAdManager.m
//  Decipher-mobile
//
//  Created by 刘心兵 on 2021/1/26.
//

#import "BGAdManager.h"
#import "AppController.h"

@implementation BGAdManager

+ (void)showRewardVideoAd {
    AppController *appCtlr = [[UIApplication sharedApplication] delegate];
    [appCtlr showRewardVideoAd];
}

+ (void)showBannerAd {
    AppController *appCtlr = [[UIApplication sharedApplication] delegate];
    [appCtlr showBannerAd];
}

+ (void)hideBannerAd {
    AppController *appCtlr = [[UIApplication sharedApplication] delegate];
    [appCtlr hideBannerAd];
}

@end
