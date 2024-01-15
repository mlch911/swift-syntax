Pod::Spec.new do |s|
  require_relative 'utils/spec'
  s.extend SwiftCollections::Spec
  s.module_name = 'SwiftSyntax'
  s.define

  s.exclude_files = 'Sources/#{self.module_name}/Documentation.docc/**/*'

  s.test_spec do |ts|
    ts.source_files = "Tests/SwiftSyntaxTest/**/*.swift"
    ts.dependency '_SwiftSyntaxTestSupport', "= #{s.version}"
  end
end
