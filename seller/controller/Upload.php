<?php
namespace app\seller\controller;
use app\seller\model\Upload as sellerUpload;
use app\seller\controller\Common;
class Upload extends Common
{

    public function index(){

        return view();
    }


    public function upload()
    {
         // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('file');
		$info = $file->validate(['ext' => 'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads',true,false);
		if ($info) {
			$msg = [
				'code' => 200,
				'data' => [
					'ext' => $info->getExtension(),
					'filename' => $info->getFilename(),
					'savefile' => $info->getSaveName()
				],
			];
		} else {
			echo $file->getError();
			exit;
		}

		// $addfile = new sellerUploadvideo();
		// $file = $addfile->uploadOne($file);
		// echo $file;

		//

		return json_encode($msg, JSON_UNESCAPED_UNICODE);
    }

    // public function upload()
    // {
    //     // 获取表单上传文件 例如上传了001.jpg
    //     $file = request()->file('file');
    //     $addfile = new sellerUpload();
    //     $file = $addfile->uploadOne($file);
    //     $msg=[
    //         'code'=>200,
    //         'data'=>$file
    //     ];
    //     return json_encode($msg,JSON_UNESCAPED_UNICODE);
    // }



}
