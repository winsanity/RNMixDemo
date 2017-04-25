//
//  Crop.h
//  RNMixDemo
//
//  Created by 王涛 on 17/4/18.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@interface Crop : NSObject

typedef void(^PickSuccess)(NSDictionary *resultDic);
typedef void(^PickFailure)(NSString *message);
- (instancetype)initWithViewController:(UIViewController *)vc;
@property (nonatomic,retain) NSMutableDictionary *response;
@property (nonatomic,copy) PickSuccess pickSuccess;
@property (nonatomic,copy) PickFailure pickFailure;

@property (nonatomic,strong) UIViewController *viewController;

- (void)selectImage:(NSDictionary *)option success:(PickSuccess)success failure:(PickFailure)failure;

@end
