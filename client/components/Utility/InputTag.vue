
<template>
	<div>
  <!--<div @click="focusNewTag()" v-bind:class="{'read-only': readOnly}" class="vue-input-tag-wrapper">
    <span v-for="(tag, index) in tags" v-bind:key="index" class="input-tag">
      <span>{{ tag }}</span>
      <a v-if="!readOnly" @click.prevent.stop="remove(index)" class="remove"></a>
    </span>
    <input v-if="!readOnly" v-bind:placeholder="placeholder" type="text" v-model="newTag" v-on:keydown.delete.stop="removeLastTag()" v-on:keydown.enter.188.tab.prevent.stop="addNew(newTag)" class="new-tag"/>
  </div> -->

		<div class="form-autocomplete" @click="focusNewTag()" v-bind:class="{'read-only': readOnly}">
			<!-- autocomplete input container -->
			<div class="form-autocomplete-input form-input">
				<!-- autocomplete chips -->
				<div class="chip" v-for="(tag, index) in tags" v-bind:key="index">
					{{ tag }}
					<a v-if="!readOnly" @click.prevent.stop="remove(index)" class="btn btn-clear" aria-label="Close" role="button"></a>
				</div>

				<!-- autocomplete real input box -->
				<input 
					@focus="focused = true"
					@blur="blur()" 
					v-if="!readOnly" 
					class="form-input new-tag" 
					v-model="newTag"
					v-on:keydown.delete.stop="removeLastTag()" 
					type="text" 
					v-bind:placeholder="placeholder" 
					v-on:keydown.enter.188.tab.prevent.stop="addNew(newTag)">
			</div>
			<ul v-show="focused && autocompletes != null && updAutocompletes.length != 0" class="menu" style="position: inherit">
				<!-- menu list chips -->
				<li class="menu-item" v-for="suggestion in updAutocompletes" @click="addNew(suggestion)">
					<a>
						<div class="tile tile-centered">
							<div class="tile-content">
								{{suggestion}}
							</div>
						</div>
					</a>
				</li>
			</ul>

		</div>
	</div>
</template>

<script>
	// taken/modified from https://github.com/matiastucci/vue-input-tag

	/*eslint-disable*/
	const validators = {
		email: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
		url : new RegExp(/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i),
		text : new RegExp(/^[a-zA-Z]+$/),
		digits : new RegExp(/^[\d() \.\:\-\+#]+$/),
		isodate : new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
	}
	/*eslint-enable*/
export default {
	name: 'InputTag',
	props: {
		tags: {
			type: Array,
			default: () => []
		},
		autocompletes: {
			type: Array,
			default: null
		},
		placeholder: {
			type: String,
			default: ''
		},
		onChange: {
			type: Function
		},
		readOnly: {
			type: Boolean,
			default: false
		},
		validate: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
			newTag: '',
			focused: false,
			recentlyFocused: false
		}
	},
	methods: {
		focusNewTag () {
			if (this.readOnly) { return }
			this.$el.querySelector('.new-tag').focus()
			this.recentlyFocused = true;
			setTimeout(() => {this.recentlyFocused = false}, 200);
		},
		addNew (tag) {
			if (tag && this.tags.indexOf(tag) === -1 && this.validateIfNeeded(tag)) {
				this.tags.push(tag)
				this.tagChange()
			}
			this.newTag = ''
		},
		validateIfNeeded (tagValue) {
			if (this.validate === '' || this.validate === undefined) {
				return true
			} else if (Object.keys(validators).indexOf(this.validate) > -1) {
				return validators[this.validate].test(tagValue)
			}
			return true
		},
		remove (index) {
			this.tags.splice(index, 1)
			this.tagChange()
		},
		removeLastTag () {
			if (this.newTag) { return }
				this.tags.pop()
				this.tagChange()
			},
		tagChange () {
			if (this.onChange) {
				// avoid passing the observer
				this.onChange(JSON.parse(JSON.stringify(this.tags)))
			}
		},
		blur () {
			setTimeout(() => {
				if(!this.$el.querySelector('.new-tag').focused && !this.recentlyFocused) {
					this.focused = false
				}
			}, 150);
		}
	},
	computed: {
		updAutocompletes() {
			if(this.autocompletes == null) return null;
			return this.autocompletes
				.filter((x) => { 
					return this.tags.indexOf(x) == -1 })
				.filter((x) => {
					return x.indexOf(this.newTag) != -1
				});
		}
	}
}
</script>

<style>
.new-tag {
	/*background: transparent;
	border: 0;
	color: #777;
	font-size: 13px;
	font-weight: 400;
	margin-bottom: 6px;
	margin-top: 1px;
	outline: none;
	padding: 4px;
	padding-left: 0;*/
	width: 80px !important;
}
</style>
