<?php
namespace app\seller\validate;
use think\Validate;
class Propertylist extends Validate
{

    protected $rule=[
        'project_name'=>'unique:propertylist|require',
        'project_price'=>'require',
        'price_per_meter'=>'require',
        'location4'=>'require',
        'location1'=>'require',
        'location2'=>'require',
        'location3'=>'require',
        'project_location'=>'require',
        'new_or_old'=>'require',
        'property_type'=>'require',
        'square_meter'=>'require',
        'property_built_time'=>'require',
        'years_for_hold'=>'require',
        'decoration'=>'require',
        'down_payment'=>'require',
        'property_usage'=>'require',
        'basic_info'=>'require',
        'content'=>'require',
    ];


    protected $message=[
        'project_name.require'=>'项目名字不得为空！',
        'project_name.unique'=>'项目名字不得重复！',
        // 'title.max'=>'文章标题长度大的大于25个字符！',
        'project_price.require'=>'项目总价格不得为空！',
        'price_per_meter.require'=>'每平米单价不得为空！',
        'location4.require'=>'城市不得为空！',
        'location1.require'=>'大洲不得为空！',
        'location2.require'=>'国家不得为空！',
        'location3.require'=>'省份不得为空！',
        'project_location.require'=>'项目详细地址不得为空！',
        'new_or_old.require'=>'房源新旧不得为空！',
        'property_type.require'=>'房源类型不得为空！',
        'square_meter.require'=>'房子面积不得为空！',
        'property_built_time.require'=>'交房时间不得为空！',
        'years_for_hold.require'=>'产权情况不得为空！',
        'decoration.require'=>'装修情况不得为空！',
        'down_payment.require'=>'房子首付不得为空！',
        'property_usage.require'=>'房子属性不得为空！',
        'basic_info.require'=>'基本信息不得为空！',
        'content'=>'项目特色不得为空！',
    ];

    protected $scene=[
        'add'=>['project_name','project_price','price_per_meter','location4','location1','location2','location3','project_location','new_or_old','property_type','square_meter','property_built_time','years_for_hold','decoration','down_payment','property_usage','basic_info','content'],
        'edit'=>['project_name','project_price','price_per_meter','location4','location1','location2','location3','project_location','new_or_old','property_type','square_meter','property_built_time','years_for_hold','decoration','down_payment'],
    ];





    

    




   

	












}
