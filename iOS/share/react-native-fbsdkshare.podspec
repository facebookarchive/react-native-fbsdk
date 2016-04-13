Pod::Spec.new do |s|
  s.name             = "react-native-fbsdkshare"
  s.version          = "0.1.0"
  s.summary          = "iOS FBSDKShareKit support for React Native apps."
  s.requires_arc = true
  s.author       = { 'dzhuowen' => 'dzhuowen@fb.com' }
  s.license      = 'Facebook Platform License'
  s.homepage     = 'n/a'
  s.source       = { :git => "https://github.com/facebook/react-native-fbsdk.git" }
  s.source_files = 'iOS/*'
  s.platform     = :ios, "7.0"
  s.dependency 'FBSDKCoreKit'
  s.dependency 'FBSDKShareKit'
  s.dependency 'React'
end
