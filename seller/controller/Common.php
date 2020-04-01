<?php
namespace app\seller\controller;
use think\Controller;
use think\Request;
class Common extends Controller
{

    public function _initialize(){
        
        $this->checkLoginTp5();
        $this->checkIsShang();


        
    }

    protected function checkLoginTp5()
    {
        $userId = session('userinfo.id');
        // dump(session('userinfo'));die;
        if (empty($userId)) {
            $this->error('请先登录',url('index/login/c_login'));
        }
    }

    protected function checkIsShang()
    {
        // $userId = session('userinfo.is_shang');
        if (!session('userinfo.is_shang')){
            $this->error('您还没有申请开通商家功能');
        }
    }

}
