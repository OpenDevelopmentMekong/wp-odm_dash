wpdash
=======

Wordpress plugin for exposing widgets with data visualizations

# Description

# Features

## widgets

## Shortcodes

### wpdash_dataviz

This plugin exposes a shortcode to allow editors placing data visualizations in the content of wordpress posts. It can receive following parameters:

**id**: the id of the data visualization to show.
**name**: alternatively to **id**, the name (slug) of the dataviz can be specified.
**width**: The width in % or px. Default: 100%
**height**: The height in % or px. Default: 300px
**hide_description**: Set to true if no description should be shown along with the data visualization.

Examples:
```php
[wpdash_dataviz id="123456"]
[wpdash_dataviz name="some-dataviz"]
[wpdash_dataviz id="123456" width="100%" height="300px"]
```

### WPDASH Show dataviz

This widget allows editors to place a certain Data visualization on the front-end by adding it to a widget area.

In order to configure it, it suffices with specifying its id on the configuration box under **Appearance > Widgets**

# Installation

1. Either download the files as zip or clone <code>git clone https://github.com/OpenDevelopmentMekong/wpdash.git</code> into the Wordpress plugins folder.
2. Install dependencies with bower (http://bower.io) <code>bower install</code>
3. Activate the plugin through the 'Plugins' menu in WordPress

# Development

1. Install bower http://bower.io/
2. Edit bower.json for adding/modifying dev dependencies versions
3. Install dependencies with <code>bower install</code>

# Requirements


# Uses


# Testing

Tests are found on /tests and can be run with ```phpunit tests```

# Continuous deployment

Everytime code is pushed to the repository, travis will run the tests available on **/tests**. In case the code has been pushed to **master** branch and tests pass, the **_ci/deploy.sh** script will be called for deploying code in CKAN's DEV instance. Analog to this, and when code from **master** branch has been **tagged as release**, travis will deploy to CKAN's PROD instance automatically.

For the automatic deployment, the scripts on **_ci/** are responsible of downloading the odm-automation repository, decrypting the **odm_tech_rsa.enc** private key file ( encrypted using Travis-ci encryption mechanism) and triggering deployment in either DEV or PROD environment.

# Copyright and License

This material is copyright (c) 2014-2015 East-West Management Institute, Inc. (EWMI).

It is open and licensed under the GNU General Public License (GPL) v3.0 whose full text may be found at:

http://www.fsf.org/licensing/licenses/gpl-3.0.html
