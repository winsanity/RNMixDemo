//
//  BaseViewController.m
//  RNMixDemo
//
//  Created by 王涛 on 17/3/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "BaseViewController.h"

#define MainScreenWidth [UIScreen mainScreen].bounds.size.width
#define MainScreenHeight [UIScreen mainScreen].bounds.size.height

@interface BaseViewController ()

@end

@implementation BaseViewController

- (void)viewWillAppear:(BOOL)animated
{
   [super viewWillAppear:animated];
   self.navigationController.navigationBarHidden = YES;
  
 
}
- (void)viewDidLoad {
    [super viewDidLoad];
  
  [self.view addSubview:self.NavgationBar];
  [self.NavgationBar addSubview:self.titleLabel];
  [self.NavgationBar addSubview:self.backBtn];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)backPage
{
     self.navigationController ? [self.navigationController popViewControllerAnimated:YES] : [self dismissViewControllerAnimated:YES completion:nil];
}

- (UIView *)NavgationBar
{
  if (!_NavgationBar) {
    
     _NavgationBar = [[UIView alloc]initWithFrame:CGRectMake(0,0, MainScreenWidth,64)];
    _NavgationBar.backgroundColor = [UIColor whiteColor];
  }
  return _NavgationBar;
}

- (UILabel *)titleLabel
{
  if (!_titleLabel) {
    _titleLabel = [[UILabel alloc]initWithFrame:CGRectMake((MainScreenWidth -100)/2, 0, MainScreenWidth, 64)];
    _titleLabel.text = self.titleText;
    _titleLabel.font = [UIFont systemFontOfSize:16.0f];
    _titleLabel.textColor = [UIColor blackColor];
  }
  return _titleLabel;
}

- (UIButton *)backBtn
{
  if (!_backBtn) {
    _backBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    _backBtn.frame = CGRectMake(20, 17, 80, 30);
    [_backBtn setTitle:@"返回" forState:UIControlStateNormal];
    [_backBtn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [_backBtn addTarget:self action:@selector(backPage) forControlEvents:UIControlEventTouchUpInside];
  }
  return _backBtn;
}

@end
