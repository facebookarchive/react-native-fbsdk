require 'json'
package = JSON.parse(File.read(File.join(__dir__, './', 'package.json')))

Pod::Spec.new do |s|
  s.name          = package['name']
  s.version       = package['version']
  s.summary       = package['description']
  s.requires_arc  = true
  s.author        = { 'dzhuowen' => 'dzhuowen@fb.com' }
  s.license       = package['license']
  s.homepage      = package['homepage']
  s.source        = { :git => 'https://github.com/facebook/react-native-fbsdk.git', :tag => "v#{package['version']}" }
  s.platforms     = { :ios => "9.0", :tvos => "9.2" }
  s.dependency      'React'

  s.subspec 'Core' do |ss|
    ss.dependency     'FBSDKCoreKit', '~> 9.0'
    ss.source_files = 'ios/RCTFBSDK/core/*.{h,m}'
  end

  s.subspec 'Login' do |ss|
    ss.dependency     'FBSDKLoginKit', '~> 9.0'
    ss.source_files = 'ios/RCTFBSDK/login/*.{h,m}'
  end

  s.subspec 'Share' do |ss|
    ss.dependency     'FBSDKShareKit', '~> 9.0'
    ss.source_files = 'ios/RCTFBSDK/share/*.{h,m}'
  end
end
