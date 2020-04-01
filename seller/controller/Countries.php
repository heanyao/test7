<?php
namespace app\seller\controller;
// use app\admin\model\AuthRule as CountriesModel;
use app\seller\model\Countries as CountriesModel;
use app\seller\controller\Common;
class Countries extends Common
{

    public function lst(){
        $authRule=new CountriesModel();
        if(request()->isPost()){
            $sorts=input('post.');
            foreach ($sorts as $k => $v) {
                $authRule->update(['id'=>$k,'sort'=>$v]);
            }
            $this->success('更新排序成功！',url('lst'));
            return;
        }
        $authRuleRes=$authRule->authRuleTree();
        // dump($authRuleRes);die;
        $this->assign('authRuleRes',$authRuleRes);
        return view();
    }

    public function add(){
        if(request()->isPost()){
            $data=input('post.');
            $plevel=db('countries')->where('id',$data['pid'])->field('level')->find();
            if($plevel){
                $data['level']=$plevel['level']+1;
            }else{
               $data['level']=0; 
            }
            $countries=new CountriesModel;
            
            $add=$countries->save($data);
            if($add){
                $this->success('添加成功！',url('lst'));
            }else{
                $this->error('添加失败！');
            }
            return;
        }
        $authRule=new CountriesModel();
        $authRuleRes=$authRule->authRuleTree();
        $this->assign('authRuleRes',$authRuleRes);
        return view();
    }

    public function edit(){
        if(request()->isPost()){
            $data=input('post.');
            // dump($data);die;
            $plevel=db('countries')->where('id',$data['pid'])->field('level')->find();
            if($plevel){
                $data['level']=$plevel['level']+1;
            }else{
               $data['level']=0; 
            }
            $countries=new CountriesModel;
            $save=$countries->update($data);
            if($save!==false){
                $this->success('修改权限成功！',url('lst'));
            }else{
                $this->error('修改权限失败！');
            }
            return;
        }
        $authRule=new CountriesModel();
        $authRuleRes=$authRule->authRuleTree();
        $authRules=$authRule->find(input('id'));
        $this->assign(array(
            'authRuleRes'=>$authRuleRes,
            'authRules'=>$authRules,
            ));
        return view();
    }


    public function del(){
        $authRule=new CountriesModel();
        // $authRule->getparentid(input('id'));
        $authRuleIds=$authRule->getchilrenid(input('id'));
        $authRuleIds[]=input('id');
        $del= CountriesModel::destroy($authRuleIds);
        if($del){
            $this->success('删除权限成功！',url('lst'));
        }else{
            $this->error('删除权限失败！');
        }
    }



    
    




   

	












}
