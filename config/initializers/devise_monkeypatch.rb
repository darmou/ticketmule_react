module Devise

  class TokenGenerator
    def custom_generate(klass, column)
      key = key_for(column)
      loop do
        raw = SecureRandom.alphanumeric(ENV['confirmation_token_length'].to_i)
        enc = OpenSSL::HMAC.hexdigest(@digest, key, raw)
        break [raw, enc] unless klass.to_adapter.find_first({ column => enc })
      end
    end
  end
end