<?php
namespace app\seller\controller;
use app\seller\model\Uploadvideo as sellerUploadvideo;
use app\seller\controller\Common;
class Uploadvideo extends Common
{

    public function index(){
 
        return view();
    }

    public function index_old(){
 
        return view();
    }

    // public function upload(){
    // // 获取表单上传文件 例如上传了001.jpg
    // $file = request()->file('file');
    // // dump($file);die;    
    // // $addfiles=new UploadModel();
    // // $fileres=$addfiles->addfiles($files);

    // }

    public function upload()
    {
        set_time_limit(0);
        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('upload');
        // dump($file);die;  
        $addfile = new sellerUploadvideo();
        $file = $addfile->uploadOne($file);
        // echo $file;
        $msg=[
            'code'=>200,
            'data'=>$file
        ];
        return json_encode($msg,JSON_UNESCAPED_UNICODE);

        // $imageStr .= DS . 'uploads'. DS .$info->getSaveName() . ',';
    }



}
