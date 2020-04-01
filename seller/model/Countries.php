<?php
namespace app\seller\model;
use think\Model;
class Countries extends Model
{

	public function authRuleTree(){
        $authRuleres=$this->order('sort desc')->select();
        return $this->sort($authRuleres);
    }

    public function sort($data,$pid=0){
        static $arr=array();
        foreach ($data as $k => $v) {
            if($v['pid']==$pid){
            	// $v['dataid']=$this->getparentid($v['id']);
                $arr[]=$v;
                $this->sort($data,$v['id']);
            }
        }
        return $arr;
    }
    
//与上面无关，下面是删除时获取所有子id的操作
    public function getchilrenid($authRuleId){
        $AuthRuleRes=$this->select();
        return $this->_getchilrenid($AuthRuleRes,$authRuleId);
    }

    public function _getchilrenid($AuthRuleRes,$authRuleId){
        static $arr=array();
        foreach ($AuthRuleRes as $k => $v) {
            if($v['pid'] == $authRuleId){
                $arr[]=$v['id'];
                $this->_getchilrenid($AuthRuleRes,$v['id']);
            }
        }

        return $arr;
    }


    // public function getparentid($authRuleId){
    //     $AuthRuleRes=$this->select();
    //     return $this->_getparentid($AuthRuleRes,$authRuleId,True);
    // }

    // public function _getparentid($AuthRuleRes,$authRuleId,$clear=False){
    //     static $arr=array();
    //     if($clear){
    //     	$arr=array();
    //     }
    //     foreach ($AuthRuleRes as $k => $v) {
    //         if($v['id'] == $authRuleId){
    //             $arr[]=$v['id'];
    //             $this->_getparentid($AuthRuleRes,$v['pid'],False);
    //         }
    //     }
    //     asort($arr);
    //     $arrStr=implode('-', $arr);
    //     return $arrStr;
    // }


    protected static function init()
    {
        Countries::event('before_insert',function($params){
            // dump($_FILES);die;
          if($_FILES['flag_url']['tmp_name']){
                $file = request()->file('flag_url');
                $info = $file->validate(['size'=>156780,'ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
                if($info){
                    // $flag_url=ROOT_PATH . 'public' . DS . 'uploads'.'/'.$info->getExtension();
                    $flag_url= DS . 'uploads'. DS .$info->getSaveName();
                    $params['flag_url']=$flag_url;
                }
            }
      });


        Countries::event('before_update',function($params){

          if($_FILES['flag_url']['tmp_name']){
                $arts=Countries::find($params->id);
                $flag_urlpath=$_SERVER['DOCUMENT_ROOT'].$arts['flag_url'];
                if(file_exists($flag_urlpath)){
                    @unlink($flag_urlpath);//unlink会删除原图片，请根据需求选择
                }
                $file = request()->file('flag_url');
                // dump($file);die;
                $info = $file->validate(['size'=>80000,'ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
                if($info){
                    // $flag_url=ROOT_PATH . 'public' . DS . 'uploads'.'/'.$info->getExtension();
                    $flag_url= DS . 'uploads'. DS .$info->getSaveName();
                    // dump($flag_url);die;
                    $params['flag_url']=$flag_url;
                }

            }
      });

        Countries::event('before_delete',function($params){
          
                $arts=Countries::find($params->id);
                $flag_urlpath=$_SERVER['DOCUMENT_ROOT'].$arts['flag_url'];
                if(file_exists($flag_urlpath)){
                    @unlink($flag_urlpath);
                }
        });


    }






}
