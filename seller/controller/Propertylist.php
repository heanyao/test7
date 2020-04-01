<?php
namespace app\seller\controller;
// use app\seller\model\Cate as CateModel;
use app\seller\model\Countries as CountriesModel;
use app\seller\model\Propertylist as PropertylistModel;
use app\seller\controller\Common;
use think\Cache;
use  think\Request;
class Propertylist extends Common
{

    public function lst(){
     
        $artres=db('Propertylist')->field('a.*,b.company_name_en')->alias('a')->join('bk_company b','a.company_id=b.id')
        ->order('a.id desc')->paginate(20)->each(function($item, $key){
        $item['property_pics_url']=db("pics")->where('belong_to','=',$item['id'])->count();
        $item['property_video']=db("video")->where('belongs','=',$item['id'])->count();
        // dump($item['property_pics_url']);die;
        $property_usage= explode(",", $item['property_usage']);  
        $item['property_usage'] = '';
        foreach ($property_usage as $v) {
            if($v == 1){
                $item['property_usage'].= '投资房,';
            }
            if($v == 2){
                $item['property_usage'].= '学区房,';
            }
        }
       $item['property_usage'] = rtrim($item['property_usage'], ',');             
            return $item;
        });
        // dump($artres);die;

        $pres=db('Propertylist')->field('a.*,b.name')->alias('a')->join('bk_publishers b','a.publisher_id=b.id')
        ->order('a.id desc')->paginate(20);
        // dump($pres);die;
        // $artres=db('Propertylist')->order('id desc')->paginate(3);
        // dump($artres);die;
        $this->assign(array(
            'artres'=>$artres,
            'pres'=>$pres,
            ));
        return view();
    }

    public function add(){

        if(request()->isPost()){
            $data=input('post.')['fang'];
            $data['publisher_id'] = session('userinfo.id');
            $data['company_id'] = session('userinfo.company_id');

            // dump($data);die;
            $data['time']=time();
            // isset($_SESSION['username'])&& $_SESSION['username']=';
            if(isset($data['property_usage'])&&$data['property_usage']!=''){
                $data['property_usage']= implode(",", $data['property_usage']);
            }
            if(isset($data['property_built_time'])&&$data['property_built_time']!=''){
            $data['property_built_time']= strtotime($data['property_built_time']);
            }
            // dump($data);die;
            $validate = \think\Loader::validate('Propertylist');
            if(!$validate->scene('add')->check($data)){
                $this->error($validate->getError());
            }

            $model=new PropertylistModel;
 
            $content ='';
            if(isset($data['content'])){
                $content = $data['content'];
                unset($data['content']);
            }
            $basic_info ='';
            if(isset($data['basic_info'])){
                $basic_info = $data['basic_info'];
                unset($data['basic_info']);
            }
            // dump($data);die;
            $return_id= $model->insertGetId($data);

            $model->save_content($return_id,$content,$basic_info);   
            
 
            if($return_id){
                // Cache::rm('companyhomes'); 
                $this->success('添加成功',url('lst'));
            }else{
                $this->error('添加失败！');
            }
            return;
        }
        $map['id']  = array('in','11,12,13,14');//这里id的顺序一定要注意，不可动，只能往后加,$confres[0]表示第一个，类推即可
        $confres=db('conf')->where($map)->select();
        foreach ($confres as $key => $v) {
            $confres[$key]= explode(",", $v['values']); 
        }; 
        $comres=db('company')->field('id,company_name_en,company_name_cn')->order('id desc')->select();
        $pres=db('publishers')->field('id,name')->order('id desc')->select();
        // dump($pres);die;
        //国家及地区
        $authRule=new CountriesModel();
        $countries=$authRule->authRuleTree();
        $countries=json_encode($countries);
        // $countries=db('countries')->field('id,name,pid,level')->order('sort desc')->select();
        // dump($countries);die;
        // $confres= ['新房','二手房'];  
        // $comres=db('Company')->field('id,company_name_en,company_name_cn')->order('id desc')->select();
        // dump($comres);die;
        // $this->assign('comres',$comres);
        $this->assign(array(
            'confres'=>$confres,
            'comres'=>$comres,
            'pres'=>$pres,
            'countries'=>$countries,
            ));

        return view();
    }


    public function edit(){
        if(request()->isPost()){
            $data=input('post.');
            // dump($data);die;
            $id=$data['id'];
            $model=new PropertylistModel;
            if(isset($data['property_usage'])&&$data['property_usage']!=''){
                $data['property_usage']= implode(",", $data['property_usage']);
            }
            if(isset($data['property_built_time'])&&$data['property_built_time']!=''){
            $data['property_built_time']= strtotime($data['property_built_time']);
            }

            $content ='';
            if(isset($data['content'])){
                $content = $data['content'];
                unset($data['content']);
            }
            $basic_info ='';
            if(isset($data['basic_info'])){
                $basic_info = $data['basic_info'];
                unset($data['basic_info']);
            }
            $model->update_content($id,$content,$basic_info);   
            // dump($content_update);die;
            $validate = \think\Loader::validate('Propertylist');
            if(!$validate->scene('edit')->check($data)){
                $this->error($validate->getError());
            }
            $article=new PropertylistModel;
            $save=$article->update($data);
            if($save){
                // Cache::rm('companyhomes'); 
                $this->success('修改成功！',url('edit',['id' => $id]));
            }else{
                $this->error('修改失败！');
            }
            return;
        }
        // $cate=new PropertylistModel();
        // $cateres=$cate->catetree();
        // $data=db('conf')->find(10); //取出语言
        // $confres= explode(",", $data['values']);  //将语言变成数组
        $comres=db('company')->field('id,company_name_en,company_name_cn')->order('id desc')->select();
        $pres=db('publishers')->field('id,name')->order('id desc')->select();
        $arts=db('Propertylist')->where(array('id'=>input('id')))->find();    
        if(isset($arts['property_usage'])&&$arts['property_usage']!=''){
           $arts['property_usage']= explode(",", $arts['property_usage']);
            }
        $content_info=db('property_content')->where(array('p_id'=>input('id')))->field('basic_info,content')->find();  
        // $arts=db('Propertylist')->field('a.*,b.company_name_en')->alias('a')->join('bk_company b','a.company_id=b.id')
        // ->order('a.id desc')->where(array('a.id'=>input('id')))->find();
        // $pres=db('Propertylist')->field('a.*,b.name')->alias('a')->join('bk_publishers b','a.publisher_id=b.id')
        // ->order('a.id desc')->where(array('a.id'=>input('id')))->find();

        // 将conf的数据提取成数组
        $map['id']  = array('in','11,12,13,14');//这里id的顺序一定要注意，不可动，只能往后加,$confres[0]表示第一个，类推即可
        $confres=db('conf')->where($map)->select();
        foreach ($confres as $key => $v) {
         $confres[$key]= explode(",", $v['values']); 
        }; 

        //国家及地区
        $authRule=new CountriesModel();
        $countries=$authRule->authRuleTree();
        $countries=json_encode($countries);
        $this->assign(array(
            'confres'=>$confres,
            'arts'=>$arts,
            'pres'=>$pres,
            'comres'=>$comres,
            'countries'=>$countries,
            'content_info'=>$content_info,
            ));
        return view();
    }

    public function pics(){
        $data=db('conf')->find(16); //取出分类
        $confres= explode(",", $data['values']);  //变成数组
        // dump($confres);die;
        $id = input('id');
        $pics=db('pics')->where(array('belong_to'=>$id))->order('id desc')->paginate(100);
        $this->assign('pics',$pics);
        $this->assign(array(
            'confres'=>$confres,
            'pics'=>$pics,
            'id'=>$id,
            ));
        return view();
    }

    public function delpics(){
        $pic=db('pics')->find(input('id'));
        $pic_path=$_SERVER['DOCUMENT_ROOT'].$pic['url'];
        if(file_exists($pic_path)){
            @unlink($pic_path);
        }
        $res=db('pics')->delete(input('id'));
        if($res){
            // Cache::rm('companyhomes'); 
            $this->success('删除图片成功！');
        }else{
            $this->error('删除图片失败！');
        }
    }

    public function video(){
        $video=db('video')->where(array('belongs'=>input('id')))->order('id desc')->paginate(100);
        $id = input('id');
        $this->assign(array(
            'video'=>$video,
            'id'=>$id,
            ));
        return view();
    }

    public function delvideo(){
        $video=db('video')->find(input('id'));
        $video_path=$_SERVER['DOCUMENT_ROOT'].$video['link'];
        if(file_exists($video_path)){
            @unlink($video_path);
        }
        $res=db('video')->delete(input('id'));
        if($res){
            // Cache::rm('companyhomes'); 
            $this->success('删除视频成功！');
        }else{
            $this->error('删除视频失败！');
        }
    }

//在原基础上新增房源的图片，需ajax
    public function picsadd(){

        $id=input('id');
        // dump($id);die;
        if(request()->isPost()){
            $data_raw=input('post.');
            $data = $data_raw['fang'];
                         // dump($data);die;
            $model=new PropertylistModel;
            $id = $data['belong_to'];
            if($data['property_pics_url']){
              $ret=  $model->save_pics($id,$data['property_pics_url'],$data['cate']); 
            } 

            if($ret){
                 $this->success('新增成功,可继续添加',url('pics',['id' => $id]));
            }else{
             $this->error('新增失败！');}

            return;
        }
        
        $data=db('conf')->find(16); //取出分类
        $confres= explode(",", $data['values']);  //变成数组
        // dump($confres);die;
        // $pics=db('pics')->where(array('id'=>input('id')))->find();
        // $this->assign('pics',$pics);
        $this->assign(array(
            'confres'=>$confres,
            'id'=>$id,
            ));
        return view();
    }


    public function picsedit(){

        if(request()->isPost()){
            $data=input('post.');
            // // dump($data);die;
            $article=new PropertylistModel;
            if($_FILES['url']['tmp_name']){
               $data=$article->change_pics($data);
               // dump($data);die;
            }
            // dump($data);die;
            $res=db('pics')->update($data);
            if($res){
                // Cache::rm('companyhomes'); 
                $id=$data['id'];
                $this->success('修改成功',url('picsedit',['id' => $id]));
            }else{
                $this->error('修改失败！');
            }
            return;
        }

        $data=db('conf')->find(16); //取出分类
        $confres= explode(",", $data['values']);  //变成数组
        // dump($confres);die;
        $pics=db('pics')->where(array('id'=>input('id')))->find();
        $this->assign(array(
            'confres'=>$confres,
            'pics'=>$pics,
            ));
        return view();
    }

//需ajax
    public function videoedit(){

        if(request()->isPost()){
            $data=input('post.');
            // dump($data);die;
            $article=new PropertylistModel;
            // dump($_FILES);die; 现在视频没有做，不是form提交，不能修改
            if($_FILES['img']['tmp_name']){
               $data=$article->change_videopic($data);
            }
            // dump($data);die;
            $res=db('video')->update($data);
            if($res){
                // Cache::rm('companyhomes'); 
                $id=$data['id'];
                $this->success('修改成功',url('videoedit',['id' => $id]));
            }else{
                $this->error('修改失败！');
            }
            return;
        }

        // $data=db('conf')->find(16); //取出分类
        // $confres= explode(",", $data['values']);  //变成数组
        // dump($confres);die;
        $video=db('video')->where(array('id'=>input('id')))->find();
        $this->assign(array(
            // 'confres'=>$confres,
            'video'=>$video,
            ));
        return view();
    }

//在原基础上新增房源的视频，需ajax
    public function videoadd(){

        $id=input('id');
        // dump($data);die;
        if(request()->isPost()){
            $data=input('post.');
			dump($data);die;
            $article=new PropertylistModel;
            if($_FILES['url']['tmp_name']){
               $data=$article->change_pics($data);
            }
            // dump($data);die;
            $res=db('pics')->update($data);
            if($res){
                // Cache::rm('companyhomes'); 
                $id=$data['id'];
                $this->success('修改成功',url('picsedit',['id' => $id]));
            }else{
                $this->error('修改失败！');
            }
            return;
        }
        
        // $data=db('conf')->find(16); //取出分类
        // $confres= explode(",", $data['values']);  //变成数组
        // dump($confres);die;
        // $pics=db('pics')->where(array('id'=>input('id')))->find();
        // $this->assign('pics',$pics);
        $this->assign(array(
            // 'confres'=>$confres,
            'id'=>$id,
            ));
        return view();
    }



    public function del(){
        if(PropertylistModel::destroy(input('id'))){
            // Cache::rm('companyhomes'); 
            $this->success('删除成功！',url('lst'));
        }else{
            $this->error('删除失败！');
        }
    }
	
	
	/*
	* @30324143
	*/
	public function newadd(){
		if(request()->isPost()){
			dump(request()->post());
		}
	}
	
	/*
	* @30324143
	*/
	public function newedit(){
		$id = input('id');
		$id = abs(intval($id));
		if(request()->isPost() && $id>0){
			dump(request()->post());
		}
	}


 
}
