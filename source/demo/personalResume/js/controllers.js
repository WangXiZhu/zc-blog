function Report_Engine($scope){
    $scope.project = {
      name : "企业智能应用综合服务平台",
      address : '',
      introduction : "实验室自主研发,基于web端的报表插件，通过基本配置生成常规的表格 报表和图形报表。",
      details:[
          {
            img : '../img/re_chart.png',
            description : '图表配置,通过对图形报表进行配置生成出最终的图表'
          },
          {
            img : '../img/re_form.png',
            description : '常规报表配置：通过对报表进行配置，生成报表'
          },
          {
            img : '../img/re_template.png',
            description : '报表模板管理，对报表的一些模板进行管理。如常用的人员模板等'
          }
      ]
    }
}

function Cisdi($scope){

  $scope.project = {
    name : '中冶赛迪远程诊断综合服务平台',
    address : 'onlinesrv.cisdi.com.cn',
    introduction : '中冶赛迪远程诊断综合服务平台实现实时远程在线诊断、调试、维护和展示服务，建立钢铁行业知识的分享平台；对内则是将企业内部原有的思科 ACS、Confluence、Active Directory、Web1800等系统进行整合，实现了集中登陆，员工用一个账号就可访问多个系统，提高了办公效率',
    details:[
      {
         img : '../img/cisdi_soldCount.png',
         description : '热轧正常卷的质量报告'
      },
       {
         img : '../img/cisdi_passSet.png',
         description : '轧制工序之粗轧'
      },
     {
         img : '../img/cisdi_soldCount.png',
         description : '销售产量图形表'
      },
     {
         img : '../img/a.png',
         description : '登录日志模块'
      }
    ]
  }
}