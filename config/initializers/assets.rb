# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = "1.0"

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
class AssetUrlProcessor
  def self.call(input)
    # don't know why, copy from other processor
    context = input[:environment].context_class.new(input)
    data = input[:data].gsub(/url\(["']?(.+?)["']?\)/i) do |match|
      asset = $1
      if asset && asset !~ /(data:|http)/i
        path = context.asset_path(asset)
        "url(#{path})"
      else
        match
      end
    end

    { data: data }
  end
end

Sprockets.register_postprocessor 'text/css', AssetUrlProcessor