var data_resources = {
  base_url : 'https://data.opendevelopmentmekong.net/api/action/datastore_search',
  api_key : '', //Li Jia Li's API Key
  maps : {
    states_regions : '/wp-content/plugins/wp-odm_dash/data/states_regions.topojson',
    township : '/wp-content/plugins/wp-odm_dash/data/township.topojson'
  },
  religion : {
    id : '1edc5ad5-9e50-4a24-8fbe-fa35c3645e74',
    exclude_fields : ['_id', 'pcode', 'total', 'region'],
    download_link : 'https://data.opendevelopmentmekong.net/dataset/be760472-6224-4d73-b309-335d732cab93/resource/1edc5ad5-9e50-4a24-8fbe-fa35c3645e74/download/census2014stateregionreligion.csv'
  },
  ts_demographic : {
    id : '632d9011-2894-446f-a591-c5ab61cf0bc7',
    download_link : 'https://data.opendevelopmentmekong.net/dataset/be760472-6224-4d73-b309-335d732cab93/resource/632d9011-2894-446f-a591-c5ab61cf0bc7/download/HouseholdPopulationbaseddatasetMIMUTownshipsDemographics.csv'
  },
  ts_household : {
    id : 'bc278a05-1ea9-4348-9352-9e14cd5ed8a3',
    download_link : 'https://data.opendevelopmentmekong.net/dataset/be760472-6224-4d73-b309-335d732cab93/resource/bc278a05-1ea9-4348-9352-9e14cd5ed8a3/download/HouseholdPopulationbaseddatasetMIMUTownshipsHouseholdAmenities.csv'
  },
  ts_labour : {
    id : '9ceb7b18-4798-4f5b-b004-d8b3a0392661',
    download_link : 'https://data.opendevelopmentmekong.net/dataset/be760472-6224-4d73-b309-335d732cab93/resource/9ceb7b18-4798-4f5b-b004-d8b3a0392661/download/HouseholdPopulationbaseddatasetMIMUTownshipsLabour.csv'
  },
  election_result_lower_2010 : {
    id : '1d1859d8-5413-4c63-a89b-46a5787d7593',
    download_link : 'https://data.opendevelopmentmekong.net/dataset/7ab77f5e-778c-488a-b7fe-5dbce90ec6b7/resource/1d1859d8-5413-4c63-a89b-46a5787d7593/download/2010electionresultspyithu.csv'
  },
  election_result_lower_2012 : {
    id : 'cfc49c33-8a78-4e7c-bfa9-35ade242e160',
    download_link : 'https://data.opendevelopmentmekong.net/dataset/4d1e3e8d-4a62-4812-8e8b-5f5293aea320/resource/cfc49c33-8a78-4e7c-bfa9-35ade242e160/download/2012electionresultspyithu.csv'
  },
  election_result_lower_2015 : {
    id : '43fd641a-35a9-4d6d-bfd0-8eabc52ca316',
    download_link : 'https://data.opendevelopmentmekong.net/dataset/ffc908b5-f13b-4085-8e77-3d0598ba6856/resource/43fd641a-35a9-4d6d-bfd0-8eabc52ca316/download/2015electionresultspyithu.csv'
  },
  state_region_pop_age_gp : {
    id : '1da6917a-fdfc-4e61-a581-99f713f36394',
    download_link : 'https://data.opendevelopmentmekong.net/dataset/7bc0cabc-3c01-44fe-ba30-943a360c56fb/resource/d646bd1e-f377-4152-a4a7-8785e2b39fc5/download/HouseholdspopulationBasedDatasetSRUnion.csv'
  }
}

var ckan_api_url = 'https://data.opendevelopmentmekong.net/api/action/datastore_search';
var ckan_api_key = '';

var charts = {
  // ================== Labour Tree Map ===================== //
  labour : {
    usual_activity_10ab : {
      chart_options : {
        title : '10 Years and over by Usual Activity Status',
        maxDepth: 2,
        maxPostDepth: 1,
        minColor: '#c42a2a',
        maxColor: '#2a84c4',
        headerHeight: 20,
        height: 500,
        useWeightedAverageForAggregation: true
      },
      chart_type : 'treemap',
      container_id : 'labour_usual_activity_10ab',
      fields : {
        'usuact_10ab_govemp_t' : {
          parent : 'Employed',
          data_dictionary : 'Goverment Employee'
        },
        'usuact_10ab_priemp_t' : {
          parent : 'Employed',
          data_dictionary : 'Private Employee'
        },
        'usuact_10ab_empyr_t' : {
          parent : 'Employed',
          data_dictionary : 'Employer'
        },
        'usuact_10ab_ownacc_t' : {
          parent : 'Employed',
          data_dictionary : 'Own Account Worker'
        },
        'usuact_10ab_unpfam_t' : {
          parent : 'Employed',
          data_dictionary : 'Unpaid Family Worker'
        },
        'usuact_10ab_seekw_t' : {
          parent : 'UnEmployed',
          data_dictionary : 'Sought Work'
        },
        'usuact_10ab_nseekw_t' : {
          parent : 'Economically Inactive',
          data_dictionary : 'Did not Seek Work'
        },
        'usuact_10ab_stu_t' : {
          parent : 'Economically Inactive',
          data_dictionary : 'Full Time Student'
        },
        'usuact_10ab_hhwork_t' : {
          parent : 'Economically Inactive',
          data_dictionary : 'Household Worker'
        },
        'usuact_10ab_retir_t' : {
          parent : 'Economically Inactive',
          data_dictionary : 'Pensioner Retired Elderly'
        },
        'usuact_10ab_ill_t' : {
          parent : 'Economically Inactive',
          data_dictionary : 'Ill Disabled'
        },
        'usuact_10ab_oth_t' : {
          parent : 'Economically Inactive',
          data_dictionary : 'Other'
        }
      },
      columns : {
        'Activity Status' : 'string',
        'Parent' : 'string',
        'Population' : 'number'
      },
      parents : [
        ['Economy', null, 0],
        ['Economically Active', 'Economy', 0],
        ['Economically Inactive', 'Economy', 0],
        ['Employed', 'Economically Active', 0],
        ['UnEmployed', 'Economically Active', 0]
      ]
    }
  },
  st_population : {
    chart_options : {
      title : 'Population Pyramid of Myanmar',
      isStacked: true,        // stacks the bars
      vAxis: {
        direction: -1       // reverses the chart upside down
      },
      hAxis: {
        format: ';'
      }
    },
    chart_type : 'bar',
    container_id : 'st_population_pyramid',
    fields : [
      '0_4',
      '5_9',
      '10_14',
      '15_19',
      '20_24',
      '25_29',
      '30_34',
      '35_39',
      '40_44',
      '45_49',
      '50_54',
      '55_59',
      '60_64',
      '65_69',
      '70_74',
      '75_79',
      '80_84',
      '85_89',
      '90ab'
    ],
    columns : {
      "Age" : 'string',
      "Male" : 'number',
      "Female" : 'number'
    }
  },
  // ====================== HEALTH EDUCATION CHART ========================= //
  health_education : {
    region_area : {
      container_id : 'region_area',
      chart_type : 'text',
      field : 'area_km2'
    },
    village_tracts_num : {
      container_id : 'village_tracts_num',
      chart_type : 'text',
      field : 'number_vt'
    },
    wards_num : {
      container_id : 'wards_num',
      chart_type : 'text',
      field : 'number_w'
    },
    villages_num : {
      container_id : 'villages_num',
      chart_type : 'text',
      field : 'number_v'
    },
    school : {
      container_id : 'school_chart',
      chart_type : 'column',
      chart_options : {
        title : 'Number of Schools'
      },
      columns : {
        'School' : 'string',
        'Number of School' : 'number'
      },
      fields : {
        'pri_school' : 'Primary School',
        'mid_school' : 'Middle School',
        'high_school' : 'High School'
      },
      colors : {
        'pri_school' : 'green',
        'mid_school' : '#F44336',
        'high_school' : '#3F51B5'
      }
    },
    students : {
      container_id : 'student_chart',
      chart_type : 'column',
      chart_options : {
        title : 'Number of Students'
      },
      columns : {
        'Students' : 'string',
        'Number of Students' : 'number'
      },
      fields : {
        'pri_students' : 'Primary School Students',
        'mid_students' : 'Middle School Students',
        'high_students' : 'High School Students'
      },
      colors : {
        'pri_students' : 'green',
        'mid_students' : '#F44336',
        'high_students' : '#3F51B5'
      }
    },
    teachers : {
      container_id : 'teacher_chart',
      chart_type : 'column',
      chart_options : {
        title : 'Number of Teachers'
      },
      columns : {
        'Teachers' : 'string',
        'Number of Teachers' : 'number'
      },
      fields : {
        'pri_teacher' : 'Primary School Teachers',
        'mid_teacher' : 'Middle School Teachers',
        'high_teacher' : 'High School Teachers'
      },
      colors : {
        'pri_teacher' : 'green',
        'mid_teacher' : '#F44336',
        'high_teacher' : '#3F51B5'
      }
    },
    hospital_healthcenter : {
      container_id : 'hospital_healthcenter',
      chart_type : 'table',
      chart_options : {
        title : 'Number of Hospitals and Health Centers'
      },
      columns : {
        'Type' : 'string',
        'Number' : 'number'
      },
      fields : {
        'gen_hos' : 'General Hospitals',
        'dis_hos' : 'District Hospitals',
        'town_hos' : 'Township Hospitals',
        'station_hos' : 'Station Hospitals',
        'mch_center' : 'Maternal and Child Health Centers',
        'rhc' : 'Rural Health Centers',
        'srhc' : 'Sub rural Health Centers'
      }
    },
    medical_worker : {
      container_id : 'medical_worker',
      chart_type : 'column',
      chart_options : {
        title : 'Number of Medical Workers'
      },
      columns : {
        'Medical Workers' : 'string',
        'Population' : 'number'
      },
      fields : {
        'doctors' : 'Doctor',
        'nurses' : 'Nurses',
        'midwives' : 'MidWives'
      }
    }
  },
  // ====================== END OF HEALTH EDUCATION CHART ========================= //

  // ================ HOUSEHOLD & DEMOGRAPHIC ================== //
  household : {
    // Household
    ownership : {
      container_id : 'household_ownership',
      chart_options : {
        title : 'Ownership of Housing Unit'
      },
      chart_type : 'donut',
      columns : {
        'Type of Ownership' : 'string',
        'Number of Household' : 'number'
      },
      fields : {
        'ownshp_own' : 'Owner',
        'ownshp_rent' : 'Renter',
        'ownshp_free' : 'Provided Free Individually',
        'ownshp_gov' : 'Goverment Quarters',
        'ownshp_com' : 'Private Company Quarters',
        'ownshp_oth' : 'Other'
      }
    },
    light_source : {
      container_id : 'household_light',
      chart_options : {
        title : 'Source of Light'
      },
      chart_type : 'donut',
      columns : {
        'Source of Light' : 'string',
        'Number of household' : 'number'
      },
      fields : {
        'light_elec' : 'Electricity',
        'light_kero' : 'Kerosene',
        'light_cand' : 'Candle',
        'light_batt' : 'Battery',
        'light_gen' : 'Generator',
        'light_wat' : 'Water Mill',
        'light_sol' : 'Solar System Energy',
        'light_oth' : 'Other'
      }
    },
    communication : {
      container_id : 'household_com',
      chart_options : {
        title : 'Avaliability of communication and related amenities'
      },
      chart_type : 'column',
      columns : {
        'Type of Communication' : 'string',
        'Number of HouseHold' : 'number'
      },
      fields : {
        'com_radio' : 'Radio',
        'com_tv' : 'Television',
        'com_lline' : 'Land Line Phone',
        'com_mob' : 'Mobile Phone',
        'com_comp' : 'Computer',
        'com_int' : 'Internet at Home'
      }
    },
    transportation : {
      container_id : 'household_trans',
      chart_options : {
        title : 'Avaliability of Transportation'
      },
      chart_type : 'column',
      columns : {
        'Type of Transportation' : 'string',
        'Number of household' : 'number'
      },
      fields : {
        'trans_car' : 'Car / Truck / Van',
        'trans_mcyc' : 'Motorcycle Moped',
        'trans_bicyc' : 'Bicycle',
        'trans_4wheel' : '4 Wheel Tractor',
        'trans_canoe' : 'Canoe Boat',
        'trans_mboat' : 'Motor Boat',
        'trans_cart' : 'Bullock Cart'
      }
    },
    // END OF HOUSEHOLD

    // DEMOGRAPHIC
    total_population : {
      container_id : 'total_population',
      chart_type : 'text',
      field : 'pop_t'
    },
    mean_household_size : {
      container_id : 'mean_household_size',
      chart_type : 'text',
      field : 'mean_hhsize'
    },
    household_size : {
      container_id : 'household_size_chart',
      chart_options : {
        title : 'HouseHold Size'
      },
      chart_type : 'column',
      columns : {
        'Household Size' : 'string',
        'Number of Household'  : 'number'
      },
      fields : {
        'hh_1' : '1 person',
        'hh_2' : '2 persons',
        'hh_3' : '3 persons',
        'hh_4' : '4 persons',
        'hh_5' : '5 persons',
        'hh_6' : '6 persons',
        'hh_7' : '7 persons',
        'hh_8' : '8 persons',
        'hh_9' : '9 persons and more'
      }
    },
    population_gender : {
      container_id : 'population_gender',
      chart_options : {
        title : 'Population by Gender Ratio'
      },
      chart_type : 'donut',
      columns : {
        'Gender' : 'string',
        'Population' : 'number'
      },
      fields : {
        'pop_m' : 'Male',
        'pop_f' : 'Female'
      }
    },
    population_u_r : {
      container_id : 'population_u_r',
      chart_options : {
        title : 'Population in Rural/Urban'
      },
      chart_type : 'donut',
      columns : {
        'Area Type' : 'string',
        'Population' : 'number'
      },
      fields : {
        'pop_u' : 'Urban Area',
        'pop_r' : 'Rural Area'
      }
    },
    m_f_headed_household : {
      container_id : 'm_f_headed_household',
      chart_options : {
        title : 'Male or Female Headed Conventional Households'
      },
      chart_type : 'donut',
      columns : {
        'Male/Female' : 'string',
        'Number of Household' : 'number'
      },
      fields : {
        'hh_m' : 'Male Headed Households',
        'hh_f' : 'Female Headed Households'
      }
    },
    // END OF DEMOGRAPHIC

    // EDUCATION
    lit_rate : {
      container_id : 'lit_rate',
      chart_options : {
        title : 'Literate Population M/F Urban/Rural breakdown'
      },
      chart_type : 'column',
      is_group : true,
      fixed_structure : true,
      columns : {
        'Area' : 'string',
        'Male' : 'number',
        'Female' : 'number'
      },
      fields : [
        ['Total', 'lit_15ab_m', 'lit_15ab_f'],
        ['Urban', 'lit_15ab_m_u', 'lit_15ab_f_u'],
        ['Rural', 'lit_15ab_m_r', 'lit_15ab_f_r']
      ]
    }
  },
  // ================ END OF HOUSEHOLD & DEMOGRAPHIC ================== //

  // ================= ELECTION RESULT ====================== //

  ts_election_lower_2010 : {
    party_result : {
      chart_options : {
        title : '2010 General Election Results for Pyithu Hluttaw',
        isStacked: 'percent'
      },
      chart_type : 'bar',
      container_id : 'election_lower_2010',
      fields : {
        'party_name' : 'Party Name',
        'votes' : 'Votes'
      },
      prepare_data_from_array : true,
      columns : {
        'Y-axis' : 'Year',
        'Y-value' : '2010'
      }
    }
  },
  ts_election_lower_2012 : {
    party_result : {
      chart_options : {
        title : 'Results for Pyithu Hluttaw, Myanmar by-elections, 2012',
        isStacked: 'percent'
      },
      chart_type : 'bar',
      container_id : 'election_lower_2012',
      fields : {
        'party_name' : 'Party Name',
        'votes' : 'Votes'
      },
      prepare_data_from_array : true,
      columns : {
        'Y-axis' : 'Year',
        'Y-value' : '2012'
      }
    }
  },
  ts_election_lower_2015 : {
    party_result : {
      chart_options : {
        title : 'Results for Pyithu Hluttaw, Myanmar General Election, 2015',
        isStacked: 'percent'
      },
      chart_type : 'bar',
      container_id : 'election_lower_2015',
      fields : {
        'party_name' : 'Party Name',
        'votes' : 'Votes'
      },
      prepare_data_from_array : true,
      columns : {
        'Y-axis' : 'Year',
        'Y-value' : '2015'
      }
    }
  },

  // ================= END OF ELECTION RESULT =================== //
};


/* =================== Chart Configs ========================= */

var chartconfig = {
  st_health_education : {
    resource : {
      id : 'bc5b9344-10de-45eb-8e15-af4aa33c1255',
      private : true,
      singlerow : true,
      download_link : 'https://data.opendevelopmentmekong.net/dataset/1b8b8832-0b56-4a93-8d6e-4293edff2ad5/resource/bc5b9344-10de-45eb-8e15-af4aa33c1255/download/Demo-Health-Edu-MIMUBLUnionStateRegion.csv',
      filters : {
        pcode : 'pcode_st'
      }
    },
    charts : charts.health_education
  },
  ts_health_education : {
    resource : {
      id : '27a9753e-8453-4097-bec3-6e4929134e61',
      private : true,
      singlerow : true,
      download_link : 'https://data.opendevelopmentmekong.net/dataset/2f4131fa-04f3-4c25-a471-b8ebf53d92d3/resource/27a9753e-8453-4097-bec3-6e4929134e61/download/Demo-Health-Edu-DataMIMU-BL.csv',
      filters : {
        pcode : 'pcode_ts'
      }
    },
    charts : charts.health_education
  },
  st_household : {
    resource : {
      id : 'd646bd1e-f377-4152-a4a7-8785e2b39fc5',
      singlerow : true,
      download_link : 'https://data.opendevelopmentmekong.net/dataset/7bc0cabc-3c01-44fe-ba30-943a360c56fb/resource/d646bd1e-f377-4152-a4a7-8785e2b39fc5/download/HouseholdspopulationBasedDatasetSRUnion.csv',
      filters : {
        pcode : 'pcode_st'
      }
    },
    charts : charts.household
  },
  ts_household : {
    resource : {
      id : '702f8d11-8301-4661-b7b8-030501a90626',
      singlerow : true,
      download_link : 'https://data.opendevelopmentmekong.net/dataset/be760472-6224-4d73-b309-335d732cab93/resource/bc278a05-1ea9-4348-9352-9e14cd5ed8a3/download/HouseholdPopulationbaseddatasetMIMUTownshipsHouseholdAmenities.csv',
      filters : {
        pcode : 'pcode_ts'
      }
    },
    charts : charts.household
  },
  st_religion : {
    resource : {
      id : '1edc5ad5-9e50-4a24-8fbe-fa35c3645e74',
      singlerow : true,
      download_link : 'https://data.opendevelopmentmekong.net/dataset/be760472-6224-4d73-b309-335d732cab93/resource/1edc5ad5-9e50-4a24-8fbe-fa35c3645e74/download/census2014stateregionreligion.csv',
      filters : {
        pcode : 'pcode'
      }
    },
    charts : {
      religion : {
        container_id : 'religion_chart',
        chart_options : {
          title : 'Religion'
        },
        chart_type : 'donut',
        columns : {
          'Religion' : 'string',
          'Population' : 'number'
        },
        fields : {
          'buddhist' : 'Buddhist',
          'christian' : 'Christian',
          'islam' : 'Islam',
          'hindu' : 'Hindu',
          'animist' : 'Animist',
          'other_religion' : 'Other Religion',
          'non_enumerated_pop' : 'Non Enumerated Population'
        }
      }
    }
  },
  population_over_year : {
    resource : {
      id : '4b96995f-7b24-4b6f-b423-d149f9f2ab21',
      download_link : 'https://data.opendevelopmentmekong.net/dataset/4046d3a9-0705-43af-b753-04b7b9af6e2f/resource/4b96995f-7b24-4b6f-b423-d149f9f2ab21/download/Area-and-Populatin-density-by-State-and-Region.csv',
      singlerow : true,
      private : true,
      filters : {
        pcode : 'Pcode'
      }
    },
    charts : {
      pop_over_year : {
        container_id : 'pop_over_year',
        chart_options : {
          title : 'Population in 1973, 1983 and 2014'
        },
        chart_type : 'line',
        columns : {
          'Year' : 'string',
          'Population' : 'number'
        },
        fields : {
          'pop_1973' : '1973',
          'pop_1983' : '1983',
          'pop_2014' : '2014'
        }
      }
    }
  },
  ts_labour : {
    resource : {
      id : '9ceb7b18-4798-4f5b-b004-d8b3a0392661',
      download_link : 'https://data.opendevelopmentmekong.net/dataset/be760472-6224-4d73-b309-335d732cab93/resource/9ceb7b18-4798-4f5b-b004-d8b3a0392661/download/HouseholdPopulationbaseddatasetMIMUTownshipsLabour.csv',
      singlerow : true,
      filters : {
        pcode : 'pcode_ts'
      }
    },
    charts : charts.labour
  },
  election_result_lower_2010 : {
    resource : {
      id : '1d1859d8-5413-4c63-a89b-46a5787d7593',
      download_link : 'https://data.opendevelopmentmekong.net/dataset/7ab77f5e-778c-488a-b7fe-5dbce90ec6b7/resource/1d1859d8-5413-4c63-a89b-46a5787d7593/download/2010electionresultspyithu.csv',
      singlerow : false,
      filters : {
        pcode : 'pcode_ts'
      }
    },
    charts : charts.ts_election_lower_2010
  },
  election_result_lower_2012 : {
    resource : {
      id : 'cfc49c33-8a78-4e7c-bfa9-35ade242e160',
      download_link : 'https://data.opendevelopmentmekong.net/dataset/4d1e3e8d-4a62-4812-8e8b-5f5293aea320/resource/cfc49c33-8a78-4e7c-bfa9-35ade242e160/download/2012electionresultspyithu.csv',
      singlerow : false,
      filters : {
        pcode : 'pcode_ts'
      }
    },
    charts : charts.ts_election_lower_2012
  },
  election_result_lower_2015 : {
    resource : {
      id : '43fd641a-35a9-4d6d-bfd0-8eabc52ca316',
      download_link : 'https://data.opendevelopmentmekong.net/dataset/ffc908b5-f13b-4085-8e77-3d0598ba6856/resource/43fd641a-35a9-4d6d-bfd0-8eabc52ca316/download/2015electionresultspyithu.csv',
      singlerow : false,
      filters : {
        pcode : 'pcode_ts'
      }
    },
    charts : charts.ts_election_lower_2015
  },
};
