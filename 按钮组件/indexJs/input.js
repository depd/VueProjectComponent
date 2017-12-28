function isValueVumber(value){
	return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+"")
}
Vue.component("inputs",{
	template:
	`
		<div class="inputs">
			<input type="text" :value="currentValue" @change="handleChage"/>
			<button @click="handUp()"> + </button>
			<button @click="handDown()"> - </button>
		</div>
	`,
	props:{
		max:{
			type:Number,
			default:Infinity
		},
		min:{
			type:Number,
			default:-Infinity
		},
		value:{
			type:Number,
			default:0
		}
	},
//	在组建内部维护value值
	data:function(){
		return {
			currentValue:this.value
		}
	},
//	监听value 与 currentValue的变化
	watch:{
		currentValue:function(val){
			this.$emit('input',val);
			this.$emit('on-change',val);
		},
		value:function(val){
			this.updateValue(val);
		}
	},
	methods:{
		updateValue:function(val){
			if(val > this.max) val = this.max;
			if(val < this.min) val = this.min;
			this.currentValue = val;
		},
		handUp:function(){
			if(this.currentValue >= this.max) return;
			this.currentValue += 1
		},
		handDown:function(){
			if(this.currentValue <= this.min) return;
			this.currentValue -= 1
		},
		handleChage:function(event){
			console.log(event.target.value);
			var val = event.target.value.trim();
			var max = this.max;
			var min = this.min;
			if(isValueVumber(val)){
				val = Number(val);
				this.currentValue = val;
				if(val > max){
					this.currentValue = max;
				}
				else if(val < min){
					this.currentValue = min;
				}
				else{
				event.target.value = this.currentValue;	
				}
			}
		}
	},
	mounted:function(){
		this.updateValue(this.value);
	}
});