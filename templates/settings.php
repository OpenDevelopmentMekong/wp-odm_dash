<div class="wrap">
    <h2>wpdash -  A wordpress plugin for exposing widgets with data visualizations</h2>
    <form method="post" action="options.php">
        <?php @settings_fields('wpdash-group'); ?>
        <?php @do_settings_fields('wpdash-group','wpdash-group'); ?>

        <?php
          $setting_1 = $GLOBALS['wpdash_options']->get_option('wpdash_setting_1');
        ?>

        <table class="form-table">
          <th scope="row"><label><h3><?php _e('Section','wp-odm_dash') ?></h3></label></th>
          <tr valign="top">
              <th scope="row"><label for="wpdash_setting_1"><?php _e('Dummy setting','wp-odm_dash') ?></label></th>
              <td>
                <input class="full-width" type="text" name="wpdash_setting_1" id="wpdash_setting_1" value="<?php echo $setting_1 ?>"/>
                <p class="description"><?php _e('Modify according to needs','wp-odm_dash') ?>.</p>
              </td>
          </tr>
        </table>
        <?php @submit_button(); ?>
    </form>
</div>
