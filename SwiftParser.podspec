Pod::Spec.new do |s|
  require_relative 'utils/spec'
  s.extend SwiftCollections::Spec
  s.define

  s.exclude_files = "Sources/#{s.module_name}/*.docc"

  s.dependency 'SwiftSyntaxLib', "= #{s.version}"

  s.test_spec do |ts|
    ts.source_files = "Tests/SwiftParserTest/**/*.swift"
    ts.dependency 'SwiftOperators',          "= #{s.version}"
    ts.dependency 'SwiftDiagnostics',        "= #{s.version}"
    ts.dependency 'SwiftSyntaxBuilder',      "= #{s.version}"
    ts.dependency '_SwiftSyntaxTestSupport', "= #{s.version}"
  end
end
