<?php
namespace app\seller\model;
use think\Model;
class Propertylist extends Model
{
    
	protected static function init()
    {
      // 	Propertylist::event('before_insert',function($params){
      //     if($_FILES['property_pics_url']['tmp_name']){
      //           $file = request()->file('property_pics_url');
      //           $info = $file->validate(['size'=>15678,'ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
      //           if($info){
      //               // $property_pics_url=ROOT_PATH . 'public' . DS . 'uploads'.'/'.$info->getExtension();
      //               $property_pics_url= DS . 'uploads'. DS .$info->getSaveName();
      //               $params['property_pics_url']=$property_pics_url;
      //           }
      //       }
      // });


      // 	Propertylist::event('before_update',function($params){
      //     if($_FILES['property_pics_url']['tmp_name']){
      //     		$arts=Propertylist::find($params->id);
      //     		$property_pics_urlpath=$_SERVER['DOCUMENT_ROOT'].$arts['property_pics_url'];
      //           if(file_exists($property_pics_urlpath)){
      //           	@unlink($property_pics_urlpath);//unlink会删除原图片，请根据需求选择
      //           }
      //           $file = request()->file('property_pics_url');
      //           $info = $file->validate(['size'=>15678,'ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
      //           if($info){
      //               // $property_pics_url=ROOT_PATH . 'public' . DS . 'uploads'.'/'.$info->getExtension();
      //               $property_pics_url= DS . 'uploads'. DS .$info->getSaveName();
      //               $params['property_pics_url']=$property_pics_url;
      //           }

      //       }
      // });

      	Propertylist::event('before_delete',function($params){
          
          		$pics=db('pics')->where(array('belong_to'=>$params->id))->select();
              if($pics){
                 foreach ($pics as $v) {
              $property_pics_urlpath=$_SERVER['DOCUMENT_ROOT'].$v['url'];
                if(file_exists($property_pics_urlpath)){
                  @unlink($property_pics_urlpath);
                }                 
              }
              }


        });


    }


    public function change_pics($data){
              $pics=db('pics')->where(array('id'=>$data['id']))->find();
              // dump($pics);die;
              $picspath=$_SERVER['DOCUMENT_ROOT'].$pics['url'];
                if(file_exists($picspath)){
                  @unlink($picspath);//unlink会删除原图片，请根据需求选择
                }
                $file = request()->file('url');
                $info = $file->validate(['size'=>1567800,'ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
                if($info){
                    // $property_pics_url=ROOT_PATH . 'public' . DS . 'uploads'.'/'.$info->getExtension();
                    $property_pics_url= DS . 'uploads'. DS .$info->getSaveName();
                    $data['url']=$property_pics_url;
                    return $data;
                }
    }

    public function change_videopic($data){
              $pics=db('video')->where(array('id'=>$data['id']))->find();
              // dump($pics);die;
              $picspath=$_SERVER['DOCUMENT_ROOT'].$pics['img'];
                if(file_exists($picspath)){
                  @unlink($picspath);//unlink会删除原图片，请根据需求选择
                }
                $file = request()->file('img');
                $info = $file->validate(['size'=>156780,'ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
                if($info){
                    // $property_pics_url=ROOT_PATH . 'public' . DS . 'uploads'.'/'.$info->getExtension();
                    $property_pics_url= DS . 'uploads'. DS .$info->getSaveName();
                    $data['img']=$property_pics_url;
                    return $data;
                }
    }

    public function save_pics($return_id,$pic_list,$cate=1){
       $data['belong_to'] = $return_id;
       $data['cate'] = $cate;//图片分类要传过来
      foreach ($pic_list as $v) {
        $data['url'] = $v;
        $list[] = $data;
      }
      return db('pics')->insertAll($list);
    }

    public function save_video($return_id,$video_list){
       $data['belongs'] = $return_id;
       $data['cate'] = 1;//图片分类要传过来
      foreach ($video_list as $v) {
        $data['link'] = $v;
        $list[] = $data;
      }
      return db('video')->insertAll($list);

    }

    public function save_content($return_id,$content,$basic_info){
       $data['p_id'] = $return_id;
       $data['content'] = $content;
       $data['basic_info'] = $basic_info;
      return db('property_content')->insert($data);

    }

    public function update_content($id,$content,$basic_info){
       $data['content'] = $content;
       $data['basic_info'] = $basic_info;
       $data['p_id'] = $id;
       // dump($id);die;
       // dump($data);die;
       // ->where('p_id','=',$id)
      return db('property_content')->where('p_id','=',$id)->insert($data, true);
    }
}
