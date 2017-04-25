//
//  WebBaseViewController.m
//  RNMixDemo
//
//  Created by 王涛 on 17/3/31.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "WebBaseViewController.h"

@interface WebBaseViewController ()

@end

@implementation WebBaseViewController

- (instancetype)initWithUrl:(NSString *)url title:(NSString *)titleStr
{
  if (self = [super init]) {
    self.url = url;
    self.titleText = titleStr;
  }
  return self;
  
}
- (void)viewDidLoad {
    [super viewDidLoad];
  
  UIWebView *webView = [[UIWebView alloc]initWithFrame:CGRectMake(0, 64, self.view.bounds.size.width, self.view.bounds.size.height)];
  NSURL *url = [NSURL URLWithString:self.url];
  NSURLRequest *request = [NSURLRequest requestWithURL:url];
  [webView loadRequest:request];
  [self.view addSubview:webView];
    // Do any additional setup after loading the view.
}






- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
