//
//  BGAdManager.h
//  Decipher-mobile
//
//  Created by 刘心兵 on 2021/1/26.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface BGAdManager : NSObject
+ (void)showRewardVideoAd;
+ (void)showBannerAd;
+ (void)hideBannerAd;
@end

NS_ASSUME_NONNULL_END
