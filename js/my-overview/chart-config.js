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
    id : '72f86e64-c434-4217-b002-bf439367b34d'
  }
};

var ckan_api_url = 'https://data.opendevelopmentmekong.net/api/action/datastore_search';
var ckan_api_key = '';
var data_source_url = 'https://myanmar.opendevelopmentmekong.net/dataset';

var charts = {
  // ================== Labour Tree Map ===================== //
  st_population : {
    chart_options : {
      title : 'Population pyramid of Myanmar',
      isStacked: true,        // stacks the bars
      vAxis: {
        direction: -1, // reverses the chart upside down
        title : 'Age groups'
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
      '90ab' : '>90'
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
      title : 'Area',
      container_id : 'region_area',
      chart_type : 'text',
      field : 'area_km2',
      unit : 'km<sup>2</sup>',
      numberformat : true
    },
    village_tracts_num : {
      title : 'Number of village tracts',
      container_id : 'village_tracts_num',
      chart_type : 'text',
      field : 'number_vt',
      numberformat : true,
      ignore_zero : true
    },
    wards_num : {
      title : 'Number of wards',
      container_id : 'wards_num',
      chart_type : 'text',
      field : 'number_w',
      numberformat : true,
      ignore_zero : true
    },
    villages_num : {
      title : 'Number of villages',
      container_id : 'villages_num',
      chart_type : 'text',
      field : 'number_v',
      numberformat : true,
      ignore_zero : true
    },
    school : {
      container_id : 'school_chart',
      chart_type : 'column',
      chart_options : {
        title : 'Number of schools per school level',
        legend: { position: "none" },
        vAxis : {
          title : 'Number of schools'
        },
        hAxis : {
          title : 'School level'
        }
      },
      columns : {
        'School' : 'string',
        'Number of School' : 'number'
      },
      fields : {
        'pri_school' : 'Primary school',
        'mid_school' : 'Middle school',
        'high_school' : 'High school'
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
        title : 'Number of students enrolled in each school level',
        legend: { position: "none" },
        vAxis : {
          title : 'Number of students'
        },
        hAxis : {
          title : 'School level'
        }
      },
      columns : {
        'Students' : 'string',
        'Number of students' : 'number'
      },
      fields : {
        'pri_students' : 'Primary school students',
        'mid_students' : 'Middle school students',
        'high_students' : 'High school students'
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
        title : 'Number of teachers',
        legend: { position: "none" },
        vAxis : {
          title : 'Number of teachers'
        },
        hAxis : {
          title : 'School level'
        }
      },
      columns : {
        'Teachers' : 'string',
        'Number of teachers' : 'number'
      },
      fields : {
        'pri_teacher' : 'Primary school teachers',
        'mid_teacher' : 'Middle school teachers',
        'high_teacher' : 'High school teachers'
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
        title : 'Breakdown of medical facilities by type'
      },
      columns : {
        'Type' : 'string',
        'Number' : 'number'
      },
      fields : {
        'gen_hos' : 'General hospitals',
        'dis_hos' : 'District hospitals',
        'town_hos' : 'Township hospitals',
        'station_hos' : 'Station hospitals',
        'mch_center' : 'Maternal and child health centers',
        'rhc' : 'Rural health centers',
        'srhc' : 'Sub rural health centers',
        'total_health_fac' : 'Total health care facilities'
      }
    },
    medical_worker : {
      container_id : 'medical_worker',
      chart_type : 'column',
      chart_options : {
        title : 'Breakdown of medical workers by type',
        vAxis : {
          title : 'Number of medical workers'
        },
        legend : {
          position: 'none'
        }
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
        title : 'Ownership of housing unit'
      },
      chart_type : 'donut',
      columns : {
        'Type of ownership' : 'string',
        'Number of household' : 'number'
      },
      fields : {
        'ownshp_own' : 'Owner',
        'ownshp_rent' : 'Renter',
        'ownshp_free' : 'Provided free individually',
        'ownshp_gov' : 'Goverment quarters',
        'ownshp_com' : 'Private company quarters',
        'ownshp_oth' : 'Other'
      }
    },
    light_source : {
      container_id : 'household_light',
      chart_options : {
        title : 'Source of light'
      },
      chart_type : 'donut',
      columns : {
        'Source of light' : 'string',
        'Number of household' : 'number'
      },
      fields : {
        'light_elec' : 'Electricity',
        'light_kero' : 'Kerosene',
        'light_cand' : 'Candle',
        'light_batt' : 'Battery',
        'light_gen' : 'Generator',
        'light_wat' : 'Water mill',
        'light_sol' : 'Solar system energy',
        'light_oth' : 'Other'
      }
    },
    communication : {
      container_id : 'household_com',
      chart_options : {
        title : 'Access to communications and related amenities by type',
        hAxis : {
          slantedText : true,
          slantedTextAngle: 45
        },
        vAxis : {
          title : 'Number of households with access'
        },
        legend : {
          position: 'none'
        }
      },
      chart_type : 'column',
      columns : {
        'Type of communication' : 'string',
        'Number of houseHold' : 'number'
      },
      fields : {
        'com_radio' : 'Radio',
        'com_tv' : 'Television',
        'com_lline' : 'Land line phone',
        'com_mob' : 'Mobile phone',
        'com_comp' : 'Computer',
        'com_int' : 'Internet at home'
      }
    },
    transportation : {
      container_id : 'household_trans',
      chart_options : {
        title : 'Access to transportation by type',
        vAxis : {
          title : 'Number of households with access'
        },
        legend : {
          position: 'none'
        }
      },
      chart_type : 'column',
      columns : {
        'Type of transportation' : 'string',
        'Number of household' : 'number'
      },
      fields : {
        'trans_car' : 'Car / Truck / Van',
        'trans_mcyc' : 'Motorcycle moped',
        'trans_bicyc' : 'Bicycle',
        'trans_4wheel' : '4 Wheel tractor',
        'trans_canoe' : 'Canoe boat',
        'trans_mboat' : 'Motor boat',
        'trans_cart' : 'Bullock cart'
      }
    },
    // END OF HOUSEHOLD

    // DEMOGRAPHIC
    total_population : {
      title : 'Total population (enumerated)',
      container_id : 'total_population',
      chart_type : 'text',
      field : 'pop_t',
      numberformat : true,
      ignore_zero : true
    },
    total_population_non_enumerated : {
      title : 'Total population (non-enumerated)',
      container_id : 'total_population_non_enumerated',
      chart_type : 'text',
      field : 'pop_t_ne',
      numberformat : true,
      ignore_zero : true
    },
    mean_household_size : {
      container_id : 'mean_household_size',
      chart_type : 'text',
      field : 'mean_hhsize'
    },
    household_size : {
      container_id : 'household_size_chart',
      chart_options : {
        title : 'Number of persons per household',
        hAxis : {
          title : 'Number of persons'
        },
        vAxis : {
          title : 'Number of households'
        },
        legend : {
          position: 'none'
        }
      },
      chart_type : 'column',
      columns : {
        'Household size' : 'string',
        'Number of household'  : 'number'
      },
      fields : {
        'hh_1' : '1',
        'hh_2' : '2',
        'hh_3' : '3',
        'hh_4' : '4',
        'hh_5' : '5',
        'hh_6' : '6',
        'hh_7' : '7',
        'hh_8' : '8',
        'hh_9' : '>9'
      }
    },
    population_gender : {
      container_id : 'population_gender',
      chart_options : {
        title : 'Population composition by gender'
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
        title : 'Population distribution in rural vs urban areas'
      },
      chart_type : 'donut',
      columns : {
        'Area type' : 'string',
        'Population' : 'number'
      },
      fields : {
        'pop_u' : 'Urban area',
        'pop_r' : 'Rural area'
      }
    },
    m_f_headed_household : {
      container_id : 'm_f_headed_household',
      chart_options : {
        title : 'Male vs Female headed conventional households'
      },
      chart_type : 'donut',
      columns : {
        'Male/Female' : 'string',
        'Number of household' : 'number'
      },
      fields : {
        'hh_m' : 'Male headed households',
        'hh_f' : 'Female headed households'
      }
    },
    // END OF DEMOGRAPHIC

    // EDUCATION
    /*lit_rate : {
      container_id : 'lit_rate',
      chart_options : {
        title : 'Literacy rate Male/Female Urban/Rural breakdown',
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
    },*/
    lit_rate_overall_pie : {
      container_id : 'lit_rate_overall_pie',
      chart_options : {
        title : 'Overall literacy rate'
      },
      chart_type : 'donut',
      columns : {
        'Literate or Illiterate' : 'string',
        'Percentage' : 'number'
      },
      fields : {
        'lit_15ab_t' : 'Literate',
        'illit_15ab_t' : 'Illiterate'
      }
    },
    lit_rate_overall_gender : {
      container_id : 'lit_rate_overall_gender',
      chart_options : {
        title : 'Overall literacy rates by gender',
        legend : {
          position : 'none',
        },
        hAxis : {
          minValue : 0,
          title : 'Percentage (%)'
        }
      },
      chart_type : 'bar',
      columns : {
        'Gender' : 'string',
        'Percentage' : 'number'
      },
      fields : {
        'lit_rate_15ab_m' : 'Male',
        'lit_rate_15ab_f' : 'Female'
      },
      colors : {
        'lit_rate_15ab_m' : '#3F51B5',
        'lit_rate_15ab_f' : '#F44336'
      }
    },
    lit_rate_urban_pie : {
      container_id : 'lit_rate_urban_pie',
      chart_options : {
        title : 'Urban literacy rate'
      },
      chart_type : 'donut',
      columns : {
        'Literate or illiterate' : 'string',
        'Percentage' : 'number'
      },
      fields : {
        'lit_15ab_t_u' : 'Literate',
        'illit_15ab_t_u' : 'Illiterate'
      }
    },
    lit_rate_urban_gender : {
      container_id : 'lit_rate_urban_gender',
      chart_options : {
        title : 'Urban literacy rates by gender',
        legend : {
          position : 'none',
        },
        hAxis : {
          minValue : 0,
          title : 'Percentage (%)'
        }
      },
      chart_type : 'bar',
      columns : {
        'Gender' : 'string',
        'Percentage' : 'number'
      },
      fields : {
        'lit_rate_15ab_m_u' : 'Male',
        'lit_rate_15ab_f_u' : 'Female'
      },
      colors : {
        'lit_rate_15ab_m_u' : '#3F51B5',
        'lit_rate_15ab_f_u' : '#F44336'
      }
    },

    lit_rate_rural_pie : {
      container_id : 'lit_rate_rural_pie',
      chart_options : {
        title : 'Rural literacy rate'
      },
      chart_type : 'donut',
      columns : {
        'Literate or illiterate' : 'string',
        'Percentage' : 'number'
      },
      fields : {
        'lit_15ab_t_r' : 'Literate',
        'illit_15ab_t_r' : 'Illiterate'
      }
    },
    lit_rate_rural_gender : {
      container_id : 'lit_rate_rural_gender',
      chart_options : {
        title : 'Rural literacy rates by gender',
        legend : {
          position : 'none',
        },
        hAxis : {
          minValue : 0,
          title : 'Percentage (%)'
        }
      },
      chart_type : 'bar',
      columns : {
        'Gender' : 'string',
        'Percentage' : 'number'
      },
      fields : {
        'lit_rate_15ab_m_r' : 'Male',
        'lit_rate_15ab_f_r' : 'Female'
      },
      colors : {
        'lit_rate_15ab_m_r' : '#3F51B5',
        'lit_rate_15ab_f_r' : '#F44336'
      }
    },

    // Labour TreeMap
    usual_activity_10ab : {
      chart_options : {
        title : '10 Years and over by Usual Activity Status',
        maxDepth: 1,
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
        'usuact_10ab_t' : {
          parent : null,
          data_dictionary : 'Economy'
        },
        'usuact_10ab_eco_act_t' : {
          parent : 'Economy',
          data_dictionary : 'Economically active'
        },
        'usuact_10ab_eco_inact_t' : {
          parent : 'Economy',
          data_dictionary : 'Economically inactive'
        },
        'emp_t' : {
          parent : 'Economically active',
          data_dictionary : 'Employed'
        },
        'usuact_10ab_govemp_t' : {
          parent : 'Employed',
          data_dictionary : 'Goverment employee'
        },
        'usuact_10ab_priemp_t' : {
          parent : 'Employed',
          data_dictionary : 'Private employee'
        },
        'usuact_10ab_empyr_t' : {
          parent : 'Employed',
          data_dictionary : 'Employer'
        },
        'usuact_10ab_ownacc_t' : {
          parent : 'Employed',
          data_dictionary : 'Own account worker'
        },
        'usuact_10ab_unpfam_t' : {
          parent : 'Employed',
          data_dictionary : 'Unpaid family worker'
        },
        'usuact_10ab_seekw_t' : {
          parent : 'UnEmployed',
          data_dictionary : 'Sought work'
        },
        'usuact_10ab_nseekw_t' : {
          parent : 'Economically inactive',
          data_dictionary : 'Did not seek work'
        },
        'usuact_10ab_stu_t' : {
          parent : 'Economically inactive',
          data_dictionary : 'Full time student'
        },
        'usuact_10ab_hhwork_t' : {
          parent : 'Economically inactive',
          data_dictionary : 'Household worker'
        },
        'usuact_10ab_retir_t' : {
          parent : 'Economically inactive',
          data_dictionary : 'Pensioner retired elderly'
        },
        'usuact_10ab_ill_t' : {
          parent : 'Economically inactive',
          data_dictionary : 'Ill disabled'
        },
        'usuact_10ab_oth_t' : {
          parent : 'Economically inactive',
          data_dictionary : 'Other'
        }
      },
      columns : {
        'Activity Status' : 'string',
        'Parent' : 'string',
        'Population' : 'number'
      },
      parents : [
        ['UnEmployed', 'Economically active', 0]
      ]
    }
  },
  // ================ END OF HOUSEHOLD & DEMOGRAPHIC ================== //

  // ================= ELECTION RESULT ====================== //

  ts_election_lower_2010 : {
    party_result : {
      chart_options : {
        title : 'Votes obtained by party for Pyitthu Hluttaw, Myanmar General Election ,2010',
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
        title : 'Votes obtained by party for Pyitthu Hluttaw, Myanmar by-elections, 2012',
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
        title : 'Votes obtained by party for Pyitthu Hluttaw, Myanmar General Election, 2015',
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
        title : 'Votes obtained by party for State/Region Parliament, Myanmar General Election, 2015',
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
        title : '2013-14 expenditure and revenue (in millions of Kyats)'
      },
      chart_type : 'column',
      container_id : 'revenue_expenditure',
      is_group : true,
      fixed_structure : true,
      columns : {
        'Revenue / Expenditure' : 'string',
        'Governance and administration high court advocate general auditor general' : 'number',
        'Departments and DAOs28 ministries administrative departments and municipalities' : 'number',
        'State owned enterprises' : 'number'
      },
      fields : [
        ['Expenditure', 'exp_adm', 'exp_min_dept', 'exp_state_ent'],
        ['Revenue', 'rev_adm', 'rev_min_dept', 'rev_state_ent']
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
      singlerow : true,
      download_link : 'https://data.opendevelopmentmekong.net/dataset/1b8b8832-0b56-4a93-8d6e-4293edff2ad5/resource/bc5b9344-10de-45eb-8e15-af4aa33c1255/download/Demo-Health-Edu-MIMUBLUnionStateRegion.csv',
      resource_link : 'https://data.opendevelopmentmekong.net/dataset/1b8b8832-0b56-4a93-8d6e-4293edff2ad5/resource/bc5b9344-10de-45eb-8e15-af4aa33c1255',
      dataset_id : '1b8b8832-0b56-4a93-8d6e-4293edff2ad5',
      filename : 'Demo-Health-Edu-MIMUBLUnionStateRegion.csv',
      resource_title : 'MIMU baseline data',
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
      resource_title : 'MIMU baseline data',
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
      resource_title : '2014 Myanmar population and housing census',
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
      resource_title : '2014 Myanmar population and housing census',
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
      resource_title : '2014 Myanmar population and housing census: Report on religion',
      filters : {
        pcode : 'pcode'
      }
    },
    charts : {
      religion : {
        container_id : 'religion_chart',
        chart_options : {
          title : 'Religions'
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
          'other_religion' : 'Other religion',
          'non_enumerated_pop' : 'Non enumerated population'
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
      resource_title : '2014 Myanmar population and housing census main report',
      singlerow : true,
      filters : {
        pcode : 'Pcode'
      }
    },
    charts : {
      pop_over_year : {
        container_id : 'pop_over_year',
        chart_options : {
          title : 'Population growth 1973-2014'
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
      resource_title : 'Union election commission',
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
      resource_title : 'Union election commission',
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
      resource_title : 'Union election commission',
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
      resource_title : 'Union election commission',
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
          title : 'Tree cover loss (2001 - 2014)',
          vAxis : {
            title : '(Ha)'
          }
        },
        chart_type : 'line',
        columns : {
          'Year' : 'string',
          'Tree cover loss (Ha)' : 'number'
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
      resource_title : '2014 Myanmar population and housing census main report',
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
          title : 'Mortality rate of infants vs. children under five years old',
          vAxis : {
            minValue : 0,
            title : 'Number of death per 1,000 live births'
          }
        },
        chart_type : 'column',
        is_group : true,
        fixed_structure : true,
        columns : {
          'Mortality rate' : 'string',
          'Infant' : 'number',
          'Under 5' : 'number'
        },
        fields : [
          ['Mortality rate', 'imr', 'u5mr']
        ]
      }
    }
  }
};
