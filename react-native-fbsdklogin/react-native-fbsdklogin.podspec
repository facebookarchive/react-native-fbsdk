Pod::Spec.new do |s|
  s.name             = "react-native-fbsdklogin"
  s.version          = "0.0.8"
  s.summary          = "iOS FBSDKLoginKit support for React Native apps."
  s.requires_arc = true
  s.author       = { 'dzhuowen' => 'dzhuowen@fb.com' }
  s.license      = 'Facebook Platform License'
  s.homepage     = 'n/a'
  s.source       = { :git => "https://github.com/facebook/react-native-fbsdk.git" }
  s.source_files = 'iOS/*'
  s.platform     = :ios, "7.0"
  s.dependency 'FBSDKCoreKit'
  s.dependency 'FBSDKLoginKit'
  s.dependency 'React'
end
