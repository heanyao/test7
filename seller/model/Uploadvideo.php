<?php
namespace app\seller\model;
use think\Model;
use think\Log;

class Uploadvideo extends Model
{

    // public function addfiles($data)
    // {
    //     if ($_FILES['head_img_url']['tmp_name']) {
    //         $file = $data;
    //         // 移动到框架应用根目录/public/uploads/ 目录下
    //         $info = $file->validate(['size' => 15678, 'ext' => 'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
    //         if ($info) {
    //             // 成功上传后 获取上传信息
    //             // 输出 jpg
    //             $img_url = DS . 'uploads' . DS . $info->getSaveName();
    //             // 输出 42a79759f284b767dfcb2a0197904287.jpg
    //             $file_urls[] = $img_url;
    //         } else {
    //             // 上传失败获取错误信息
    //             echo $file->getError();
    //         }
    //     }
    // }

    public function uploadOne($file)
    {

        // echo phpinfo();die;
        // 获取表单上传文件
        if (empty($file)) {
            $msg = 'empty upload file';
            Log::error($msg);
            return $msg;
        }

        // 移动到框架应用根目录/public/uploads/ 目录下
        // $path = ROOT_PATH . 'public' ;
        // $info = $file->move($path . '/uploads');
        $info = $file->validate(['size' => 100000000000000000000000000000, 'ext' => 'mp4,rmvb,MP4'])->move(ROOT_PATH . 'public' . DS . 'uploadvideos');
        if ($info) {
            // 成功上传后 获取上传信息
            // 输出 jpg
            return DS . 'uploadvideos' . DS . $info->getSaveName();
        } else {
            // 上传失败获取错误信息
            return $file->getError();
        }
    }

    // public function upload()
    // {
    //     // 获取表单上传文件
    //     $files = request()->file('image');
    //     foreach ($files as $file) {
    //         // 移动到框架应用根目录/public/uploads/ 目录下
    //         $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
    //         if ($info) {
    //             // 成功上传后 获取上传信息
    //             // 输出 jpg
    //             echo $info->getExtension();
    //             // 输出 42a79759f284b767dfcb2a0197904287.jpg
    //             echo $info->getFilename();
    //         } else {
    //             // 上传失败获取错误信息
    //             echo $file->getError();
    //         }
    //     }
    // }

}