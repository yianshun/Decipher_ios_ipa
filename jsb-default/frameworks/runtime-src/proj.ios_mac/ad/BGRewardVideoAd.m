//
//  BGRewardVideoAd.m
//  Decipher-mobile
//
//  Created by 刘心兵 on 2021/1/25.
//

#import "BGRewardVideoAd.h"
#import "AppController.h"
#import <AnyThinkRewardedVideo/AnyThinkRewardedVideo.h>

@implementation BGRewardVideoAd
+ (void)show{
    AppController *appCtlr = [[UIApplication sharedApplication] delegate];
    [appCtlr showRewardVideoAd];
}

@end
