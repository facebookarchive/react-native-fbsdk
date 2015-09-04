Pod::Spec.new do |s|
  s.name             = "react-native-fbsdkads"
  s.version          = "0.0.1"
  s.summary          = "iOS FBAudienceNetwork support for React Native apps."
  s.requires_arc = true
  s.author       = { 'rhegde' => 'rhegde@fb.com' }
  s.license      = 'Facebook Platform License'
  s.homepage     = 'n/a'
  s.source       = { :git => "https://github.com/facebook/react-native-fbsdk.git" }
  s.source_files = 'iOS/*'
  s.platform     = :ios, "7.0"
  s.dependency 'FBAudienceNetwork'
  s.dependency 'React'
end
