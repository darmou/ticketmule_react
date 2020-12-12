# load the compact UI extra
require 'pagy/extras/shared'
require 'pagy/extras/metadata'
require 'pagy/extras/items'

# set the default items per page
Pagy::VARS[:items_param] = :perPage
Pagy::VARS[:perPage] = 10