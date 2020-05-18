# table

## table模板

```
<template>
  <div>
    <div class="search-options-wrap" ref="searchWrap">
      <el-input v-model="phoneNumber" placeholder="手机号" style="width: 200px" class="ml-15"></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left: 15px"></el-button>
    </div>
    <div class="table_container">
      <el-table-column align="center" type="index" width="50"></el-table-column>
      <el-table-column align="center" width="120" property="phone" label="异常订单编号"></el-table-column>
    </div>
    <div ref="block" style="padding: 5px;">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        time:[],
        height:800,
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleEdit(){
        this.dialogFormVisible = true
      },
    },
    created(){
      this.$nextTick( ()=> {
        this.height = document.documentElement.clientHeight - this.$refs.searchWrap.clientHeight - this.$refs.block.clientHeight - 70
      })
    },
  }
</script>
```



## table单元格自定义

```
<el-table-column
              align="center"
              prop="exceptionType"
              width="140"
              label="操作">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.exceptionType == 1">设备上线后自动解除</el-tag>
              <el-tag type="warning"  v-else>请运维人员处理</el-tag>
            </template>
</el-table-column>
```



## 设置表头颜色

```
<el-table
                :data="tableData3"
                :header-cell-style="{background:'#FFFFDA'}"
                border>
```

## 设置居中

<https://blog.csdn.net/weixin_42598901/article/details/81908194> 

![img](https://img-blog.csdn.net/20180821151827301?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjU5ODkwMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70) 



## 单选

```vue
<el-table :data="roleTableData"
                      ref="multipleTable"
                      highlight-current-row
                      @row-click="handleRowClick"
                      @selection-change="handleSelectionChange"
                      style="width: 100%" border>
              <el-table-column
                  type="selection"
                  width="50">
              </el-table-column>
              <el-table-column
                  type="index"
                  width="50">
              </el-table-column>
              <el-table-column align="center" label="角色名称" prop="roleName"></el-table-column>
</el-table>

multipleSelection: {},//存储table中选中的数据
    
//默认只可以选择一个
      handleSelectionChange(val){
        if(val.length >1){
          this.$refs.multipleTable.clearSelection()
          this.$refs.multipleTable.toggleRowSelection(val.pop())
        }else{
          this.multipleSelection = val.pop()
        }
      },
      //点击行单选
      handleRowClick(row){
        this.$refs.multipleTable.toggleRowSelection(row)
      }
```





## 默认被选择（高亮）

```
repairmanReplenishmentManage/smallProgramReplenishmentManage(小程序补货员管理)



this.$nextTick(function () {
                  // DOM 更新了
                  this.$refs.multipleTable.toggleRowSelection(data)
                })
```



# el-tag

```
//类型
<el-tag>标签一</el-tag>
<el-tag type="success">标签二</el-tag>
<el-tag type="info">标签三</el-tag>
<el-tag type="warning">标签四</el-tag>
<el-tag type="danger">标签五</el-tag>

//尺寸
<el-tag closable>默认标签</el-tag>
<el-tag size="medium" closable>中等标签</el-tag>
<el-tag size="small" closable>小型标签</el-tag>
<el-tag size="mini" closable>超小标签</el-tag>
```



# message提示框(confirm)

```
this.$confirm('确定将用户<font color="red">' + nickname + '</font>加入黑名单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
```

```
this.$message.success('保存成功')
this.$message.warning('验证码错误')
```



# el-select下拉框选择器

三级联动 systemSettings(系统设置)/merchantManage商家管理

```js
<el-select v-model="regionId" placeholder="分区" style="min-width:150px" class="ml-15"
                   :loading="regionIdSelectLoading"
                   @visible-change="getRegionIdList">
          <el-option label="分区" value=""></el-option>
          <el-option
            v-for="item in regionIdList"
            :key="item.regionId"
            :label="item.regionName"
            :value="item.regionId">
          </el-option>
        </el-select>
        
        
        
regionId:'',
regionIdList:[],
regionIdSelectLoading:false,


getRegionIdList(data){
        if(data){
          if(this.regionIdList.length == 0){
            this.regionIdSelectLoading = true
            this.TaolinRegionListApi()
          }
        }
      },
      async TaolinRegionListApi() {
        let params = {
          query: ''
        }
        try {
          let res = await TaolinRegionList(params)
          console.log(res)
          if (res.status == 1001) {
          this.regionIdList = res.data
          this.regionIdSelectLoading = false
          } else {
          this.regionIdSelectLoading = false
          }
        } catch (error) {
        this.regionIdSelectLoading = false
        }
      },
```









# el-dialog对话框

```vue
<el-dialog title="设备远程盘点" width="1000px" @close="remoteInventoryClose" :visible.sync="remoteInventoryShow">
    <div class="flex jc-c">
        <div>
          <el-button type="primary" @click="addShow = false">取消</el-button>
          <el-button type="primary" @click="add" :disabled="addShowDisabled">保存</el-button>
        </div>
      </div>
      
</el-dialog>
```



#  el-drawer 

```
systemSettings(系统设置)/roleManage角色管理   merchantManage商家管理
有动态高度


<el-drawer
        title="商家管理"
        :visible.sync="drawerShow"
        direction="rtl"
        @close="drawerShowClose">
    </el-drawer>
```



























# el-card

```vue
<el-card>
       

</el-card>
```



# el-button

```vue
<el-button type="primary" icon="el-icon-edit" disabled></el-button>
  <el-button type="success" icon="el-icon-check"></el-button>
  <el-button type="info" icon="el-icon-message"></el-button>
  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
  <el-button type="danger" icon="el-icon-delete"></el-button>
<el-button type="danger" icon="el-icon-view" size="mini"></el-button>
```





# el-radio单选

```vue
<el-radio-group v-model="distributionWay">
              <el-radio :label="1">按比例分润</el-radio>
              <el-radio :label="2">按金额分润</el-radio>
</el-radio-group>
```





# el-tree

```vue
<el-tree :data="OrgTreeList"
               default-expand-all="true"
               :props="OrgTreeListDefaultProps" @node-click="handleNodeClick"></el-tree>
               
               
OrgTreeList: [],//商家树形数据
OrgTreeListDefaultProps:{children: 'data',
    abel: 'text'},
    
//树结构api  /Org/treeVue
      async OrgTreeVueApi(){
        let params = {
          parentId: '42',//父ID
        }
        try{
          let res = await OrgTreeVue(params)
          if(res.status == 1001){
            let tree = [{text:'消费者管理',data:[]}]
            tree[0].data = res.data.data
            this.OrgTreeList = tree
          }else{
          }
        }catch(error){
        }
      },
```



## 树节点的选择(多选，默认渲染，默认高亮)

```vue
repairmanReplenishmentManage/smallProgramReplenishmentManage(小程序补货员管理)

<el-tree 			:data="RegionAndLineTreeList"
                       style="height: 400px;overflow-y: auto;"
                       default-expand-all="true"
                       show-checkbox
                       node-key="accId"
                       :default-checked-keys="RegionAndLineTreeIdList"
                       :props="menuRootDataDefaultProps"></el-tree>
                       
 //设置所属商家高亮
this.$refs.orgTreeRef.setCurrentKey(id)                 
```



## 点击懒加载

```
基础数据/商品管理/商品分类管理 goodsClassifyManage

<el-tree :load="loadNode"
               :props="defaultProps"
               @node-click="handleNodeClick"
               lazy
               highlight-current></el-tree>
               
async loadNode(node, resolve) {
         //console.log(node);
         if (node.level === 0) {
          return resolve([{text:'商品分类',id: '0',leaf:false,children:[]}]);
        }
        else if(node.level === 1){
          let params = {
            parentId:'0'
          }
          try {
            let res = await TaolinGoodsCategoryTreeVue(params)
            if (res.status == 1001) {
              let arr = []
              res.data.map(item => {
                let obj = {}
                if(item.__redundantField == 0){
                  obj = item
                  obj.leaf = true
                }else{
                  obj = item
                  obj.leaf = false
                }
                arr.push(obj)
              })
              return resolve(arr);
            } else {
            }
          } catch (error) {
          }
        }
        else{
           let params = {
             parentId:node.data.id
           }
           try {
             let res = await TaolinGoodsCategoryTreeVue(params)
             if (res.status == 1001) {
               let arr = []
               res.data.map(item => {
                 let obj = {}
                 if(item.__redundantField == 0){
                   obj = item
                   obj.leaf = true
                 }else{
                   obj = item
                   obj.leaf = false
                 }
                 arr.push(obj)
               })
               return resolve(arr);
             } else {
             }
           } catch (error) {
           }
        }
      },
```



## elementui tree懒加载刷新问题

**在基础数据/商品管理/商品分类管理 goodsClassifyManage使用过**



 http://www.mamicode.com/info-detail-2932467.html 

```
//首先是保持根节点
loadNode(node, resolve) {
      //    
      if (node.level === 0) {
        this.node_had = node;//这里是关键！在data里面定义一个变量，将node.level == 0的node存起来
        this.resolve_had = resolve;//同上，把node.level == 0的resolve也存起来
        request.post("/gljs/queryjs").then(res => {
          if (res.errorCode === 0) {
            return resolve( res.data);
          }
        });
      } else {
        request.post("/gljs/querygnsbyjs").then(res => {
          if (res.errorCode === 0) {
            resolve(res.data);
          }
        });
      }
    }
//当请求新数据时，两行代码就可以了。
requestNewData() {
      this.node_had.childNodes = [];//把存起来的node的子节点清空，不然会界面会出现重复树！
      this.loadNode(this.node_had, this.resolve_had);//再次执行懒加载的方法
	...//下面的代码省略
}
```









# el-form表单

systemSettings(系统设置)/dictionaryManage字典管理     roleManage（角色管理） merchantManage商家管理

```vue
<el-form ref="loginFormRef" :model="uploadDialogForm"
                 :rules="uploadDialogRules" label-width="100px" size="mini">
          <el-form-item label="发货人:" required>
            <span>消费者管理</span>
          </el-form-item>
          <el-form-item prop="invoiceTime" label="发货时间:" required>
            <el-date-picker
              v-model="uploadDialogForm.invoiceTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="invoiceNo" label="发货单号:">
            <el-input v-model="uploadDialogForm.invoiceNo" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item prop="invoicePhone" label="联系电话:">
            <el-input v-model="uploadDialogForm.invoicePhone" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="收货人:" prop="invoicePhone">
            <el-select v-model="uploadDialogForm.receiptPersonName" placeholder="收货人">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="batchNum" label="批次号:">
            <el-input v-model="uploadDialogForm.batchNum" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="上传图片:" required>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>



 data(){
      //在return 上面写自定义效验方法
      const checkAccountName = (rule, value, callback) => {
        if (!value) {
          //callback 是提示的信息
          return callback(new Error('请输入角色名称'));
        } else {
          let params = {
            roleName:this.drawerForm.roleName,
            roleId:this.drawerForm.roleId
          }
          RoleCheckName(params).then(
            res => {
              if(res.status == 1001){
                callback();
              }else{
                this.dialogForm.accountName = ''
                callback("已存在该角色名称");
              }
            }
          )
        }
      };
const validateSorder = (rule, value, callback) => {
        if (!value) {
          //callback 是提示的信息
          return callback(new Error('请输入0-100整数'));
        } else {
          if(!/(^0$)|(^100$)|(^\d{1,2}$)/.test(value)){
            this.drawerForm.sorder = 100
            callback("请输入0-100整数");
          }else{
            callback()
          }
        }
      }
      return {
uploadDialogForm: { // 上传表单的数据
          invoiceNo: '',//发货单号
          invoiceTime: '',//发货时间
          invoicePhone: '',//电话
          receiptPersonName: '',//收货人名称
          invoiceImages: '',//发货单图片
          batchNum: '',//批次号
          goodsInfo: '',//发货信息
        },
uploadDialogRules:{ // 上传表单的验证规则
roleName: [
            { validator: checkAccountName, trigger: 'blur' }
          ],
          invoiceTime: [
            { required: true, message: '请选择时间', trigger: 'blur' }
          ],
          invoiceNo: [
            { required: true, message: '请输入发货单号', trigger: 'blur' }
          ],
          invoicePhone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' }
          ],
          receiptPersonName: [
            { required: true, message: '请选择收货人',trigger: 'change'}
          ],
          batchNum: [
            { required: true, message: '请输入批次号', trigger: 'blur' }
          ],
        },
        
        
//编辑页面关闭
      editShowClose(){
        this.stepActive = 0
        this.$refs.subAccountFormRef.resetFields();
        this.subAccountDialogForm = this.$options.data().subAccountDialogForm
      },
```

