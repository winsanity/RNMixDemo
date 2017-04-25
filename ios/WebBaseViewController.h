//
//  WebBaseViewController.h
//  RNMixDemo
//
//  Created by 王涛 on 17/3/31.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "BaseViewController.h"

@interface WebBaseViewController : BaseViewController

@property (nonatomic,copy) NSString *url;

- (instancetype)initWithUrl:(NSString *)url title:(NSString *)titleStr;
@end
