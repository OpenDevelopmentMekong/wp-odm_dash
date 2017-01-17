<?php

require_once dirname(dirname(__FILE__)) . '/utils/wpdash-utils.php';

class UtilsTest extends PHPUnit_Framework_TestCase
{
  public function setUp()
  {
  }

  public function tearDown()
  {
  }

  public function testExtractIdAndLinkFromUrl()
  {
    $resource_url = "https://data.opendevelopmentmekong.net/dataset/7bc0cabc-3c01-44fe-ba30-943a360c56fb/resource/d646bd1e-f377-4152-a4a7-8785e2b39fc5";
    $explode_by_dataset = explode('/dataset/', $resource_url );
    $explode_by_resource = explode('/resource/', $explode_by_dataset[1]);
    $resource_id = $explode_by_resource[1];
    $dataset_id = $explode_by_resource[0];

    $this->assertEquals($resource_id,"d646bd1e-f377-4152-a4a7-8785e2b39fc5");
    $this->assertEquals($dataset_id,"7bc0cabc-3c01-44fe-ba30-943a360c56fb");

  }

}
