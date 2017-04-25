//
//  BaseViewController.h
//  RNMixDemo
//
//  Created by 王涛 on 17/3/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface BaseViewController : UIViewController


@property (nonatomic,strong) UIView *NavgationBar;

@property (nonatomic,strong) UILabel *titleLabel;

@property (nonatomic,strong) UIButton *backBtn;

@property (nonatomic,copy) NSString *titleText;



@end
