//
//  O2cRnUtil.m
//  RNMixDemo
//
//  Created by 王涛 on 17/3/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "O2cRnUtil.h"
#import "WebBaseViewController.h"


@interface O2cRnUtil ()<UINavigationControllerDelegate,UIImagePickerControllerDelegate>

@end

@implementation O2cRnUtil
//  必须实现
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(switchToPageView:(NSString *)url titleText:(NSString *)title){
  
  dispatch_async(dispatch_get_main_queue(), ^{
    UINavigationController *navi = (UINavigationController *)[UIApplication sharedApplication].keyWindow.rootViewController;
    WebBaseViewController *webView = [[WebBaseViewController alloc]initWithUrl:url  title:title];
    NSLog(@"%@,%@",url,title);
    [navi presentViewController:webView animated:YES completion:nil];
  });
  
}

RCT_EXPORT_METHOD(switchToImagePicker){
   dispatch_async(dispatch_get_main_queue(), ^{
     UINavigationController *navi = (UINavigationController *)[UIApplication sharedApplication].keyWindow.rootViewController;
       UIImagePickerController * picker = [[UIImagePickerController alloc]init];
     if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypePhotoLibrary]) {
       picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
       //设置代理
       picker.delegate=self;
       [navi presentViewController:picker animated:YES completion:nil];
     }
   });
}

@end
