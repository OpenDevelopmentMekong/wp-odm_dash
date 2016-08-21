var data_resources = {
  base_url : 'https://data.opendevelopmentmekong.net/api/action/datastore_search',
  api_key : '', //Li Jia Li's API Key
  maps : {
    states_regions : '/wp-content/plugins/wp-odm_dash/data/states_regions.topojson',
    township : '/wp-content/plugins/wp-odm_dash/data/township.topojson'
  },
  state_region_pop_age_gp : {
    id : '1da6917a-fdfc-4e61-a581-99f713f36394',
    download_link : 'https://data.opendevelopmentmekong.net/dataset/7bc0cabc-3c01-44fe-ba30-943a360c56fb/resource/d646bd1e-f377-4152-a4a7-8785e2b39fc5/download/HouseholdspopulationBasedDatasetSRUnion.csv'
  },
  adminstration_list : {
    id : 'fe0a5815-b58d-423b-816a-8347ec85b2bb'
  }
}

var ckan_api_url = 'https://data.opendevelopmentmekong.net/api/action/datastore_search';
var ckan_api_key = '';

var charts = {
  // ================== Labour Tree Map ===================== //
  st_population : {
    chart_options : {
      title : 'Population Pyramid of Myanmar',
      isStacked: true,        // stacks the bars
      vAxis: {
        direction: -1, // reverses the chart upside down
        title : 'Age Groups'
      },
      hAxis: {
        format: "#,###;#,###"
      }
    },
    chart_type : 'bar',
    container_id : 'st_population_pyramid',
    fields : {
      '0_4' : '0-4',
      '5_9' : '5-9',
      '10_14' : '10-14',
      '15_19' : '15-19',
      '20_24' : '20-24',
      '25_29' : '25-29',
      '30_34' : '30-34',
      '35_39' : '35-39',
      '40_44' : '40-44',
      '45_49' : '45-49',
      '50_54' : '50-54',
      '55_59' : '55-59',
      '60_64' : '60-64',
      '65_69' : '65-69',
      '70_74' : '70-74',
      '75_79' : '75-79',
      '80_84' : '80-84',
      '85_89' : '85-89',
      '90ab' : '90 yrs and Above'
    },
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
      field : 'area_km2',
      numberformat : true
    },
    village_tracts_num : {
      container_id : 'village_tracts_num',
      chart_type : 'text',
      field : 'number_vt',
      numberformat : true
    },
    wards_num : {
      container_id : 'wards_num',
      chart_type : 'text',
      field : 'number_w',
      numberformat : true
    },
    villages_num : {
      container_id : 'villages_num',
      chart_type : 'text',
      field : 'number_v',
      numberformat : true
    },
    school : {
      container_id : 'school_chart',
      chart_type : 'column',
      chart_options : {
        title : 'Number of Schools',
        legend: { 
          position: "none" 
        }
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
        title : 'Number of Students',
        legend: { 
          position: "none" 
        }
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
        title : 'Number of Teachers',
        legend: { 
          position: "none" 
        }
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
      field : 'pop_t',
      numberformat : true
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
        title : 'Literacy rate M/F Urban/Rural breakdown',
        vAxis : {
          minValue : 0,
          title : "Percentage (%)"
        }
      },
      chart_type : 'column',
      is_group : true,
      fixed_structure : true,
      columns : {
        'Area' : 'string',
        'Both sex' : 'number',
        'Male' : 'number',
        'Female' : 'number'
      },
      fields : [
        ['Total', 'lit_rate_15ab_t', 'lit_rate_15ab_m', 'lit_rate_15ab_f'],
        ['Urban', 'lit_rate_15ab_t_u', 'lit_rate_15ab_m_u', 'lit_rate_15ab_f_u'],
        ['Rural', 'lit_rate_15ab_t_r', 'lit_rate_15ab_m_r', 'lit_rate_15ab_f_r']
      ]
    },

    // Labour TreeMap
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
  // ================ END OF HOUSEHOLD & DEMOGRAPHIC ================== //

  // ================= ELECTION RESULT ====================== //

  ts_election_lower_2010 : {
    party_result : {
      chart_options : {
        title : 'Votes Obtained by Party for Pyitthu Hluttaw, Myanmar General Election ,2010',
        isStacked: 'percent',
        hAxis : {
          title : 'Votes'
        }
      },
      chart_type : 'bar',
      container_id : 'election_lower_2010',
      fields : {
        'party' : 'party_name',
        'value' : 'votes'
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
        title : 'Votes Obtained by Party for Pyitthu Hluttaw, Myanmar by-elections, 2012',
        isStacked: 'percent',
        hAxis : {
          title : 'Votes'
        }
      },
      chart_type : 'bar',
      container_id : 'election_lower_2012',
      fields : {
        'party' : 'party_name',
        'value' : 'votes'
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
        title : 'Votes Obtained by Party for Pyitthu Hluttaw, Myanmar General Election, 2015',
        isStacked: 'percent',
        hAxis : {
          title : 'Votes'
        }
      },
      chart_type : 'bar',
      container_id : 'election_lower_2015',
      fields : {
        'party' : 'party_name',
        'value' : 'votes'
      },
      prepare_data_from_array : true,
      columns : {
        'Y-axis' : 'Year',
        'Y-value' : '2015'
      }
    }
  },
  st_election_2015 : {
    party_result : {
      chart_options : {
        title : 'Votes Obtained by Party for State/Region Parliament, Myanmar General Election, 2015',
        isStacked : 'percent',
        hAxis : {
          title : 'Seats'
        }
      },
      chart_type : 'bar',
      container_id : 'st_election_2015',
      fields : {
        party : 'party',
        value : 'seats'
      },
      prepare_data_from_array : true,
      columns : {
        'Y-axis' : 'Year',
        'Y-value' : '2015'
      }
    }  
  },
  // ================= END OF ELECTION RESULT =================== //
  
  // ================= REVENUE & EXPENDITURE ================== //
  
  revenue_expenditure : {
    revenue_expenditure : {
      chart_options : {
        title : '2013-14 Expenditure and Revenue (in millions of Kyats)'
      },
      chart_type : 'column',
      container_id : 'revenue_expenditure',
      is_group : true,
      fixed_structure : true,
      columns : {
        'Revenue / Expenditure' : 'string',
        'Governance and Administration High Court Advocate General Auditor General' : 'number',
        'Departments and DAOs28 Ministries Administrative Departments and Municipalities' : 'number',
        'State Owned Enterprises' : 'number',
        'Total' : 'number'
      },
      fields : [
        ['Expenditure', 'exp_adm', 'exp_min_dept', 'exp_state_ent', 'exp_total'],
        ['Revenue', 'rev_adm', 'rev_min_dept', 'rev_state_ent', 'rev_total']
      ]
    }    
  }

  // ================= END OF REVENUE & EXPENDITURE ================ //
  
};


/* =================== Chart Configs ========================= */

var chartconfig = {
  st_health_education : {
    resource : {
      id : 'bc5b9344-10de-45eb-8e15-af4aa33c1255',
      private : true,
      singlerow : true,
      download_link : 'https://data.opendevelopmentmekong.net/dataset/1b8b8832-0b56-4a93-8d6e-4293edff2ad5/resource/bc5b9344-10de-45eb-8e15-af4aa33c1255/download/Demo-Health-Edu-MIMUBLUnionStateRegion.csv',
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/1b8b8832-0b56-4a93-8d6e-4293edff2ad5/resource/bc5b9344-10de-45eb-8e15-af4aa33c1255',
      dataset_id : '1b8b8832-0b56-4a93-8d6e-4293edff2ad5',
      filename : 'Demo-Health-Edu-MIMUBLUnionStateRegion.csv',
      resource_title : 'MIMU Baseline Data',
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
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/2f4131fa-04f3-4c25-a471-b8ebf53d92d3/resource/27a9753e-8453-4097-bec3-6e4929134e61',
      dataset_id : '2f4131fa-04f3-4c25-a471-b8ebf53d92d3',
      filename : 'Demo-Health-Edu-DataMIMU-BL.csv',
      resource_title : 'MIMU Baseline Data',
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
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/7bc0cabc-3c01-44fe-ba30-943a360c56fb/resource/d646bd1e-f377-4152-a4a7-8785e2b39fc5',
      dataset_id : '7bc0cabc-3c01-44fe-ba30-943a360c56fb',
      filename : 'HouseholdspopulationBasedDatasetSRUnion.csv',
      resource_title : '2014 Myanmar Population and Housing Census',
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
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/be760472-6224-4d73-b309-335d732cab93/resource/bc278a05-1ea9-4348-9352-9e14cd5ed8a3',
      dataset_id : 'be760472-6224-4d73-b309-335d732cab93',
      filename : 'HouseholdPopulationbaseddatasetMIMUTownshipsHouseholdAmenities.csv',
      resource_title : '2014 Myanmar Population and Housing Census',
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
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/be760472-6224-4d73-b309-335d732cab93/resource/1edc5ad5-9e50-4a24-8fbe-fa35c3645e74',
      dataset_id : 'be760472-6224-4d73-b309-335d732cab93',
      filename : 'census2014stateregionreligion.csv',
      resource_title : '2014 Myanmar Population and Housing Census: Report on religion',
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
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/4046d3a9-0705-43af-b753-04b7b9af6e2f/resource/4b96995f-7b24-4b6f-b423-d149f9f2ab21',
      dataset_id : '4046d3a9-0705-43af-b753-04b7b9af6e2f',
      filename : 'Area-and-Populatin-density-by-State-and-Region.csv',
      resource_title : '2014 Myanmar Population and Housing Census Main Report',
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
  election_result_lower_2010 : {
    resource : {
      id : '1d1859d8-5413-4c63-a89b-46a5787d7593',
      download_link : 'https://data.opendevelopmentmekong.net/dataset/7ab77f5e-778c-488a-b7fe-5dbce90ec6b7/resource/1d1859d8-5413-4c63-a89b-46a5787d7593/download/2010electionresultspyithu.csv',
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/7ab77f5e-778c-488a-b7fe-5dbce90ec6b7/resource/1d1859d8-5413-4c63-a89b-46a5787d7593',
      dataset_id : '7ab77f5e-778c-488a-b7fe-5dbce90ec6b7',
      filename : '2010electionresultspyithu.csv',
      resource_title : 'Union Election Commission',
      singlerow : false,
      filters : {
        pcode : 'pcode_ts'
      },
      sort_by : 'votes'
    },
    charts : charts.ts_election_lower_2010
  },
  election_result_lower_2012 : {
    resource : {
      id : 'cfc49c33-8a78-4e7c-bfa9-35ade242e160',
      download_link : 'https://data.opendevelopmentmekong.net/dataset/4d1e3e8d-4a62-4812-8e8b-5f5293aea320/resource/cfc49c33-8a78-4e7c-bfa9-35ade242e160/download/2012electionresultspyithu.csv',
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/4d1e3e8d-4a62-4812-8e8b-5f5293aea320/resource/cfc49c33-8a78-4e7c-bfa9-35ade242e160',
      dataset_id : '4d1e3e8d-4a62-4812-8e8b-5f5293aea320',
      filename : '2012electionresultspyithu.csv',
      resource_title : 'Union Election Commission',
      singlerow : false,
      filters : {
        pcode : 'pcode_ts'
      },
      sort_by : 'votes'
    },
    charts : charts.ts_election_lower_2012
  },
  election_result_lower_2015 : {
    resource : {
      id : '43fd641a-35a9-4d6d-bfd0-8eabc52ca316',
      download_link : 'https://data.opendevelopmentmekong.net/dataset/ffc908b5-f13b-4085-8e77-3d0598ba6856/resource/43fd641a-35a9-4d6d-bfd0-8eabc52ca316/download/2015electionresultspyithu.csv',
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/ffc908b5-f13b-4085-8e77-3d0598ba6856/resource/43fd641a-35a9-4d6d-bfd0-8eabc52ca316',
      dataset_id : 'ffc908b5-f13b-4085-8e77-3d0598ba6856',
      filename : '2015electionresultspyithu.csv',
      resource_title : 'Union Election Commission',
      singlerow : false,
      filters : {
        pcode : 'pcode_ts'
      },
      sort_by : 'votes'
    },
    charts : charts.ts_election_lower_2015
  },
  state_region_election_2015 : {
    resource : {
      id : '617724b4-351c-4d9c-b6dd-88fcc0495869',
      download_link : 'https://data.opendevelopmentmekong.net/dataset/4bbcff3a-b480-406a-8882-86d82655bcf1/resource/617724b4-351c-4d9c-b6dd-88fcc0495869/download/Election-Results-for-State-and-Region-Seats.csv',
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/4bbcff3a-b480-406a-8882-86d82655bcf1/resource/617724b4-351c-4d9c-b6dd-88fcc0495869',
      dataset_id : '4bbcff3a-b480-406a-8882-86d82655bcf1',
      filename : 'Election-Results-for-State-and-Region-Seats.csv',
      resource_title : 'Union Election Commission',
      singlerow : false,
      filters : {
        pcode : 'pcode_st'
      },
      sort_by : 'seats'
    },
    charts : charts.st_election_2015
  },
  revenue_expenditure : {
    resource : {
      id : '7dcb30ad-75cf-4339-af6c-290683d904f5',
      download_link : 'https://data.opendevelopmentmekong.net/dataset/c6778dfe-836f-48ad-9812-d1d27acce3cc/resource/7dcb30ad-75cf-4339-af6c-290683d904f5/download/stateregionsexprev.csv',
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/myanmar-state-and-region-expenditure-and-revenue/resource/7dcb30ad-75cf-4339-af6c-290683d904f5',
      dataset_id : 'c6778dfe-836f-48ad-9812-d1d27acce3cc',
      filename : 'stateregionsexprev.csv',
      resource_title : 'Open Myanmar Initiative',
      singlerow : true,
      filters : {
        pcode : 'pcode_st'
      }
    },
    charts : charts.revenue_expenditure
  },
  tree_cover : {
    resource : {
      id : '74c7dea8-e8ee-49ad-b946-b4dda2d6e20f',
      download_link : 'https://data.opendevelopmentmekong.net/dataset/95dec5d5-a328-47b6-a5e1-0a3d798f5650/resource/74c7dea8-e8ee-49ad-b946-b4dda2d6e20f/download/tree-cover-combined.csv',
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/tree-cover-data-from-global-forest-watch/resource/74c7dea8-e8ee-49ad-b946-b4dda2d6e20f',
      dataset_id : '95dec5d5-a328-47b6-a5e1-0a3d798f5650',
      filename : 'tree-cover-combined.csv',
      resource_title : 'Global Forest Watch',
      singlerow : true,
      filters : {
        pcode : 'pcode_st'
      }
    },
    charts : {
      tree_cover_percent : {
        container_id : 'tree_cover_percent',
        chart_type : 'text',
        field : 'percent_cover'
      },
      tree_cover_area : {
        container_id : 'tree_cover_area',
        chart_type : 'text',
        field : 'tce_hectares',
        numberformat : true
      },
      tree_cover_gain_2001_2012 : { 
        container_id : 'tree_cover_gain_2001_2012',
        chart_type : 'text',
        field : 'tcg_hectares',
        numberformat : true
      },
      tree_cover_loss : {
        container_id : 'tree_cover_loss',
        chart_options : {
          title : 'Tree Cover Loss (2001 - 2014)',
          vAxis : {
            title : '(Ha)'
          }
        },
        chart_type : 'line',
        columns : {
          'Year' : 'string',
          'Tree Cover Loss (Ha)' : 'number'
        },
        fields : {
          'tcl_2001' : '2001',
          'tcl_2002' : '2002',
          'tcl_2003' : '2003',
          'tcl_2004' : '2004',
          'tcl_2005' : '2005',
          'tcl_2006' : '2006',
          'tcl_2007' : '2007',
          'tcl_2008' : '2008',
          'tcl_2009' : '2009',
          'tcl_2010' : '2010',
          'tcl_2011' : '2011',
          'tcl_2012' : '2012',
          'tcl_2013' : '2013',
          'tcl_2014' : '2014',
        }
      }
    }
  },
  health_life_expectancy : {
    resource : {
      id : '01f16e66-0280-44cc-b728-90d362b450cc',
      download_link : 'https://data.opendevelopmentmekong.net/dataset/493e50f6-de0d-46aa-89ce-975e6a964af7/resource/01f16e66-0280-44cc-b728-90d362b450cc/download/2014-Census-Health.xlsx',
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/the-levels-of-cbr-tfr-and-total-marital-fertility-rates-tmfr-by-state-region-and-childhood-mortalit/resource/01f16e66-0280-44cc-b728-90d362b450cc',
      dataset_id : '493e50f6-de0d-46aa-89ce-975e6a964af7',
      filename : '2014-Census-Health.xlsx',
      resource_title : '2014 Myanmar Population and Housing Census Main Report',
      singlerow : true,
      filters : {
        pcode : 'pcode_st'
      }
    },
    charts : {
      cbr : {
        container_id : 'health_cbr',
        chart_type : 'text',
        field : 'cbr'
      },
      life_expectancy : {
        container_id : 'health_life_expectancy',
        chart_type : 'text',
        field : 'life_expentancy_at_birth'
      },
      mortality_rate : {
        container_id : 'health_mortality_rate',
        chart_options : {
          title : 'Mortality Rate',
          vAxis : {
            minValue : 0,
            title : 'Number of death per 1,000 live births'
          }
        },
        chart_type : 'column',
        is_group : true,
        fixed_structure : true,
        columns : {
          'Mortality Rate' : 'string',
          'Infant' : 'number',
          'Under 5' : 'number'
        },
        fields : [
          ['Mortality Rate', 'imr', 'u5mr']
        ]
      }
    }
  }
};
