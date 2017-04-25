//
//  MainViewController.m
//  RNMixDemo
//
//  Created by 王涛 on 17/3/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "MainViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@interface MainViewController ()

@end

@implementation MainViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  
  
  self.NavgationBar.hidden = YES;
  
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RNMixDemo"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  rootView.frame = self.view.bounds;
  
  [self.view addSubview:rootView];
  
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
