var GISApp = {

	// 模仿jQuery的$
	$: function(selector, context) {

		var result = null;
		var newContext = (context || document);

		if (selector == null || selector === "") {
			return;
		}

		if (/^#/.test(selector)) {
			result = document.getElementById(selector.substring(1));
		} else if (/^\./.test(selector)) {
			result = newContext.getElementsByClassName(selector.substring(1));
		} else if (/^\w+$/.test) {
			result = newContext.getElementsByTagName(selector);
		} else if (selector === "*") {
			result = newContext.getElementsByTagName("*");
		} else if (/^</.test(selector)) {
			result = document.createElement(selector.substring(1, selector.indexOf(">")));
		}

		return result;
	}

	// 扩展功能
	, extendFunctions: {

		Sleeper: function() {
			var self = this;
			//var FUNC = 0;
			//var TIME = 1;

			self.step = 0;
			self.actions = [];

			self.push = function(fn, time) {
				if (typeof(time) == 'undefined') {
					time = 0;
				}
				self.actions.push([fn, time]);

				return self;
			};

			self.run_next = function() {
				if (self.step < self.actions.length) {
					var action = self.actions[self.step],
						fn = action[0],
						time = action[1];
					if (typeof(fn) == 'function') {
						fn();
					} else {
						eval(fn);
					}
					++self.step;
					setTimeout(self.run_next, time);
				}
			};

			self.run = function() {
				self.run_next();
			};

			return self;
		}
	}
	// div 的ID值
	, divId: "allmap"

	// 缩放范围
	, zoomRange: {
		minZoom: 1,
		maxZoom: 19
	}

	// 所有景点:
	, spotsCoordinate: {
		// 南门坐标
		southDoor: {
			lng: 108.912327,
			lat: 34.373761
		}

		// 图书錧坐标
		, library: {
			lng: 108.91106,
			lat: 34.376650
		}

		// 明远湖坐标
		, mingyuanLake: {
			lng: 108.910256,
			lat: 34.374491
		}

		// 修远湖坐标
		, xiuyuanLake: {
			lng: 108.907638,
			lat: 34.373634
		}

		// 滋兰苑
		, zilanYuan: {
			lng: 108.905617,
			lat: 34.375139
		}

		// 树蕙园
		, shuhuiYuan: {
			lng: 108.915853,
			lat: 34.377694
		}

		// 体育錧
		, gym: {
			lng: 108.917604,
			lat: 34.380401
		}

		// 汽车实验场
		, carExperimentalField: {
			lng: 108.908603,
			lat: 34.378468
		}
	}

	// 所有景点的信息
	, allSpotsInfo: {
		southdoor: {
			title: "长安大学",
			imgSrc: "http://files.eduuu.com/img/2014/11/13/144452_546453643f406.jpg",
			imgTitle: "长安大学南门",
			imgId: "southdoor",
			info: "长安大学（Chang’an University）座落于古都西安，是中华人民共和国教育部直属的全国重点大学，由教育部和交通运输部、国土资源部、住房和城乡建设部、陕西省人民政府“四部一省”共建，是国家首批“211工程”、“985工程优势学科创新平台”、“111计划”、国家建设高水平大学公派研究生项目”和“卓越工程师教育培养计划”重点建设高校。"
		}

		, library: {
			title: "逸夫图书錧",
			imgSrc: "http://1813.img.pp.sohu.com.cn/images/blog/2008/9/18/23/27/11d1d12b3a5g215.jpg",
			imgTitle: "逸夫图书錧",
			imgId: "library",
			info: "长安大学逸夫图书馆位于长安大学渭水校区，共13层，约45000平方米，是渭水新校区的重要标志，也是长安大学的标志，逸夫图书馆气势恢宏，是长安大学各个校区图书馆最高大的一个，2至5层为图书借阅室，6至8层为自习室。馆内学习资源丰富，各种学习设施齐全，是学习钻研的好去处。"
		}

		, mingyuanLake: {
			title: "明远湖",
			imgSrc: "http://i3.s1.dpfile.com/2011-08-16/9163507_b.jpg%28249x249%29/thumb.jpg",
			imgTitle: "明远湖",
			imgId: "mingyuanLake",
			info: "明远湖的夜晚，则是有着昏黄的灯光，道路变得很是柔软。有朦胧的雾气连接着湖面，显得甚是奇幻。水中的鱼儿都枕着水草入睡，杨柳也低垂着面庞。一切都跟童话里的插图一个样。当我走得困倦，我就躺下来，倚靠在亭子上。当你靠在亭子上时，你又有了一些念想。"
		}

		, xiuyuanLake: {
			title: "修远湖",
			imgSrc: "http://f.hiphotos.baidu.com/zhidao/pic/item/8601a18b87d6277f4b94390c2b381f30e924fc04.jpg",
			imgTitle: "修远湖",
			imgId: "mingyuanLake",
			info: "蛇形石路皆以疏散圆石铺成，滑而坎坷，虽欲疾速前往，却感力不从心。浓浓诗意，油然而生。水声清脆，渐闻渐近。迎面松柳，犬牙交错。坎坎小路，曲折萦回。参差树木，渐远而去。绿色湖面，宽阔朦胧，滴滴点点现于犬齿之隙。步行数步，林路双尽，豁然开朗。绿水之面，波光粼粼，悉数鸟雀，飞于其上，忽而行止于空，忽而疾行而下，萦绕空中。阶梯河床之上，潺潺绿流，缓缓流下。湖畔垂柳随细风细心摆弄枝尖，婀娜身姿，配以细条嫩叶、鸣啼之鸟，衬于修远湖之列。修远湖之景，其景之佳，使观者神清气爽，悠然自得。"
		}

		, zilanYuan: {
			title: "滋兰苑",
			imgSrc: "http://zsb.chd.edu.cn/edit/UploadFile/2010524151950363.jpg",
			imgTitle: "滋兰苑",
			imgId: "zilanYuan",
			info: "西区食堂, 环境优雅"
		}

		, shuhuiYuan: {
			title: "树蕙园",
			imgSrc: "http://2b.zol-img.com.cn/product/76_500x2000/569/ceXav8z4L7iOs.jpg",
			imgTitle: "树蕙园",
			imgId: "shuhuiYuan",
			info: "东区食堂, 环境优雅,美食多多."
		}

		, gym: {
			title: "体育錧",
			imgSrc: "http://static.panoramio.com/photos/large/23064096.jpg",
			imgTitle: "渭水校区体育錧",
			imgId: "gym",
			info: "同学们跑步,踢球的好地方"
		}

		, carExperimentalField: {
			title: "汽车实验场",
			imgSrc: "http://img1.imgtn.bdimg.com/it/u=114869758,491208999&fm=21&gp=0.jpg",
			imgTitle: "长安大学汽车实验场",
			imgId: "carExperimentalField",
			info: "长安大学汽车试验场是中国高校唯一的汽车综合性能试验基地，占地423亩，总投资近6000万元，是国家“211工程”重点投资建设项目。拥有全长2.4km的汽车高速环形跑道、1.1km直线试车道、五种可靠性强化典型试验道路、13000m2的操纵稳定性试验广场、三种低附着系数组合路面。"
		}
	}

	// 放大级别
	, initScaleLevel: 19

	// 要显示的城市, 必须
	, city: "西安"

	, map: null

	// 初始化
	, init: function() {

		// 创建Map实例, 设置默认显示为卫星地图, 设置地图允许的最小/大级别
		this.map = new BMap.Map("allmap", /*{mapType: BMAP_SATELLITE_MAP},*/ this.zoomRange);

		var map = this.map;

		// 初始化地图,设置中心点坐标和地图级别
		map.centerAndZoom(new BMap.Point(this.spotsCoordinate.southDoor.lng,
			this.spotsCoordinate.southDoor.lat), this.initScaleLevel);

		// 添加地图类型控件
		map.addControl(new BMap.MapTypeControl());

		// 设置地图显示的城市 此项是必须设置的
		map.setCurrentCity(this.city);

		// 开启鼠标滚轮缩放
		/// map.enableScrollWheelZoom(false);

		/*// 添加比例尺控件
		 map.addControl(new BMap.ScaleControl());

		 //添加鱼骨控件
		 map.addControl(new BMap.NavigationControl());*/

		//添加缩略地图控件
		map.addControl(new BMap.OverviewMapControl({
			size: new BMap.Size(150, 150),

			// 初始状态是打开还是关闭
			isOpen: true
		}));

		// map.setMapType(new MapType(BMAP_SATELLITE_MAP));
	}

	// 移动地图
	, moveMap: function(map, options) {

		if (!map) {
			throw new Error("Please give effective parameters!");
		}

		var curr = map.getCenter(),
			dest = options.dest,
			steps = parseInt(options.totalTime / options.interval),
			callback = options.callback,

		// 经度距离
			lngDist = dest.lng - curr.lng,

		// 纬度距离
			latDist = dest.lat - curr.lat,

		// 应该移动的方向
			directions = {

				// 在中国
				// 如果目标经度小(偏向西边), 就向左移动
				toLeft: lngDist < 0,

				// 如果目标纬度大, 就向上移动
				toUp: latDist > 0
			},

			everyLng = (Math.abs(lngDist) / steps).toFixed(6),
			everyLat = (Math.abs(latDist) / steps).toFixed(6);

		var timer = setInterval(function() {

			if (steps-- <= 0) {
				/*
				 map.setCenter(new BMap.Point(dest.lng,
				 dest.lat));*/
				clearInterval(timer);

				if (typeof callback === "function") {
					callback(map);
				}
			}

			/*if (Math.abs(curr.lng - dest.lng) <= 0.000001
			 || Math.abs(curr.lat - dest.lat) <= 0.000001 ) {
			 clearInterval(timer);

			 map.centerAndZoom(new BMap.Point(dest.lng,
			 dest.lat), this.initScaleLevel);
			 }*/

			if (directions.toLeft) {
				curr.lng = parseFloat(curr.lng) - parseFloat(everyLng);
			} else {
				curr.lng = parseFloat(curr.lng) + parseFloat(everyLng);
			}

			if (directions.toUp) {
				curr.lat = parseFloat(curr.lat) + parseFloat(everyLat);
			} else {
				curr.lat = parseFloat(curr.lat) - parseFloat(everyLat);
			}

			map.panTo(new BMap.Point(curr.lng, curr.lat));
		}, options.interval);



	}



	// 构造描述信息窗口:
	, buildInfoWindow: function(infoObj) {
		var title = infoObj.title,
			imgSrc = infoObj.imgSrc,
			imgTitle = infoObj.imgTitle,
			imgId = infoObj.imgId,
			info = infoObj.info;

		return '<div class="info-of-spots">'
			+ '<h4>' + title + '</h4>'
			+ '<img id="' + imgId + '" src="' + imgSrc + '" title="' + imgTitle + '"/> '
			+ '<p>' + info + '</p>'
			+ '</div>';
	}

	, displayInfo: function(infoObj) {
		var style = {
			position: "absolute",
			left: 0,
			top: 0,
			backgroundColor: "#fff",
			opacity: 0.1
		};
		var infoWindow = this.buildInfoWindow(infoObj);
		var div = document.createElement("div");
		div.innerHTML = infoWindow;

		var child = div.childNodes[0];
		child.id = "display";
		for (var p in style) {
			if (style.hasOwnProperty(p)) {
				child.style[p] = style[p];
			}
		}

		this.$("body")[0].appendChild(child);

		var timer = setInterval(function() {
			if (parseFloat(child.style.opacity) >= 1) {
				child.style.opacity = 1;
				clearInterval(timer);
			}
			child.style.opacity = parseFloat(child.style.opacity) + 0.05;
		}, 100);
	}

	// 基本的标记
	, buildBasicMarker: function(map, options) {
		var point = new BMap.Point(options.point.lng, options.point.lat);// this.spotsCoordinate.southDoor.lng, this.spotsCoordinate.southDoor.lat);
		var marker = new BMap.Marker(point); // 创建标注
		var animationType = options.animationType || BMAP_ANIMATION_BOUNCE;
		map.addOverlay(marker); // 将标注添加到地图中
		marker.setAnimation(animationType); //跳动的动画

		return marker;
	}

	// 创建窗口
	, buildWnd: function(map, options) {
		var marker = this.buildBasicMarker(map, options.markerObj);

		// 百度地图API功能
		var infoForSpot = this.buildInfoWindow(options.infoObj);

		var wndOfSouthdoor = new BMap.InfoWindow(infoForSpot); // 创建信息窗口对象
		map.addOverlay(marker);

		// marker.openInfoWindow(wndOfSouthdoor);

		//图片加载完毕重绘infowindow
		marker.addEventListener("load", function() {

			// 防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
			wndOfSouthdoor.redraw();
		}, false);

		// 点击marker出现说明信息
		marker.addEventListener("click", function() {
			//this.openInfoWindow(wndOfSouthdoor);
		});
	}

	// 标记南门
	, markSouthDoor: function() {
		this.buildWnd(this.map, {
			markerObj: {
				point: this.spotsCoordinate.southDoor
			}
			, infoObj: this.allSpotsInfo.southdoor
		});
	}

	// 标记图书錧
	, markLibrary: function() {
		this.buildWnd(this.map, {
			markerObj: {
				point: this.spotsCoordinate.library
			}
			, infoObj: this.allSpotsInfo.library
		});
	}

	// 标记明远湖
	, markMingyuanLake: function() {
		this.buildWnd(this.map, {
			markerObj: {
				point: this.spotsCoordinate.mingyuanLake
			}
			, infoObj: this.allSpotsInfo.mingyuanLake
		});
	}

	/*// 标记修远湖
	 , markXiuyuanLake: function() {
	 this.buildWnd(this.map, {
	 markerObj: {
	 point: this.spotsCoordinate.xiuyuanLake
	 }
	 , infoObj: this.allSpotsInfo.xiuyuanLake
	 });
	 }*/

	// 标记滋兰苑
	, markZilanYuan: function() {
		this.buildWnd(this.map, {
			markerObj: {
				point: this.spotsCoordinate.zilanYuan
			}
			, infoObj: this.allSpotsInfo.zilanYuan
		});
	}

	// 标记树蕙园
	, markShuhuiYuan: function() {
		this.buildWnd(this.map, {
			markerObj: {
				point: this.spotsCoordinate.shuhuiYuan
			}
			, infoObj: this.allSpotsInfo.shuhuiYuan
		});
	}

	// 标记体育錧
	, markGym: function() {
		this.buildWnd(this.map, {
			markerObj: {
				point: this.spotsCoordinate.gym
			}
			, infoObj: this.allSpotsInfo.shuhuiYuan
		});
	}

	// 标记汽车实验场
	, markCarExperimentalField: function() {
		this.buildWnd(this.map, {
			markerObj: {
				point: this.spotsCoordinate.carExperimentalField
			}
			, infoObj: this.allSpotsInfo.carExperimentalField
		});
	}

	// 开始展示景点
	, travel: function() {

		var that = this;


		window.addEventListener("load", function() {
			var sleeper = new that.extendFunctions.Sleeper();
			sleeper.push(function() {
				that.init();
				// that.map.setZoom(10);
				that.markSouthDoor();

				that.displayInfo(that.allSpotsInfo.southdoor);

			}, 10000).push(function() {
				that.moveMap(that.map, {
					dest: that.spotsCoordinate.library
					, interval: 100
					, totalTime: 5000
					, callback: function() {
						that.$("body")[0].removeChild(that.$("#display"));
						that.displayInfo(that.allSpotsInfo.library);
						document.title = that.allSpotsInfo.library.title;
					}
				});

				that.markLibrary();


			}, 10000).push(function() {
				that.moveMap(that.map, {
					dest: that.spotsCoordinate.mingyuanLake
					, interval: 100
					, totalTime: 5000
					, callback: function() {
						that.$("body")[0].removeChild(that.$("#display"));
						that.displayInfo(that.allSpotsInfo.mingyuanLake);
						document.title = that.allSpotsInfo.mingyuanLake.title;
					}
				});

				that.markMingyuanLake();

			}, 10000)/*.push(function() {
			 that.moveMap(that.map, {
			 dest: that.spotsCoordinate.xiuyuanLake
			 , interval: 100
			 , totalTime: 4000
			 });

			 that.markXiuyuanLake();

			 })*/.push(function() {
				that.moveMap(that.map, {
					dest: that.spotsCoordinate.zilanYuan
					, interval: 100
					, totalTime: 4000
					, callback: function() {
						that.$("body")[0].removeChild(that.$("#display"));
						that.displayInfo(that.allSpotsInfo.zilanYuan);
						document.title = that.allSpotsInfo.zilanYuan.title;
					}
				});

				that.markZilanYuan();

			}, 10000).push(function() {
				that.moveMap(that.map, {
					dest: that.spotsCoordinate.shuhuiYuan
					, interval: 100
					, totalTime: 5000
					, callback: function() {
						that.$("body")[0].removeChild(that.$("#display"));
						that.displayInfo(that.allSpotsInfo.shuhuiYuan);
						document.title = that.allSpotsInfo.shuhuiYuan.title;
					}
				});

				that.markShuhuiYuan();

			}, 10000).push(function() {
				that.moveMap(that.map, {
					dest: that.spotsCoordinate.gym
					, interval: 100
					, totalTime: 4000
					, callback: function() {
						that.$("body")[0].removeChild(that.$("#display"));
						that.displayInfo(that.allSpotsInfo.gym);
						document.title = that.allSpotsInfo.gym.title;
					}
				});

				that.markGym();

			}, 10000).push(function() {
				that.moveMap(that.map, {
					dest: that.spotsCoordinate.carExperimentalField
					, interval: 100
					, totalTime: 5000
					, callback: function() {
						that.$("body")[0].removeChild(that.$("#display"));
						that.displayInfo(that.allSpotsInfo.carExperimentalField);
						document.title = that.allSpotsInfo.carExperimentalField.title;

						setTimeout(function() {
							document.title = "渭水长安景点导航";
							that.$("body")[0].removeChild(that.$("#display"));
							that.map.clearOverlays();
							that.map.setZoom(6);
							that.buildBasicMarker(that.map, {
								point: that.spotsCoordinate.library
							});
						}, 2000)
					}
				});

				that.markCarExperimentalField();

			}, 6000).run();


		}, false);
	}

	//
	// 启动入口
	, start: function() {
		this.travel();
	}
};
GISApp.start();