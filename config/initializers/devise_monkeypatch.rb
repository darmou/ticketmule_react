module Devise
  mattr_accessor :confirmation_token_length

  class TokenGenerator
    def custom_generate(klass, column)
      key = key_for(column)
      loop do
        raw = SecureRandom.alphanumeric(Rails.configuration.confirmation_token_length)
        enc = OpenSSL::HMAC.hexdigest(@digest, key, raw)
        break [raw, enc] unless klass.to_adapter.find_first({ column => enc })
      end
    end
  end
end