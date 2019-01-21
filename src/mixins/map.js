
let popup = null
export default {
    data() {
        return {
            lastFlowSheetId: -1,
        }
    },
    methods: {
        initMap(dom) {
            // 创建窗体对象
            popup = new this.getMap.Popup({
                anchor: "top",
                offsetX: 0,
                offsetY: 0,
                zoomFactor: 2
            }, this.getMap.domConstruct.create("div"));

            //地图初始化
            this.map = new this.getMap.Map(dom, {
                logo: false,
                slider: true,
                isDoubleClickZoom: false,
                sliderPosition: 'bottom-right',
                infoWindow: popup, // 地图上面的窗体框
                /* maxScale参数为地图可以放大的最大比例尺，minScale参数为地图可以缩小的最小比例尺
                    目前全国瓦片形图能放大的最大级别为2256.994353。由于比例尺不是标准的整数，使用不太方便，建议使用级别来控制
                    maxZoom参数为地图可以放大的最大级别，minZoom参数为地图可以缩小的最小级别
                    具体的级别和比例尺对应关系可以直接访问下方的地图url，查看Levels of Detail。目前全国地图最大级别为18级(从0开始0
                */
                maxZoom: 18,
                minZoom: 9,
                // 默认显示级别为12级
                zoom: 12,
                // 默认显示廊坊地区范围
                extent: new this.getMap.Extent({
                    xmin: 116.48791453099358,//12967375.327355506
                    ymin: 39.47926723536149,//4790556.863335548
                    xmax: 116.85629984598576,//13008383.793030446
                    ymax: 39.60317443579239,//4808443.127954256
                    // spatialReference为空间地理参考系代码，本demo中使用的地图为web墨卡托-84坐标系
                    spatialReference: {wkid: 4326}
                })
            });
            // 新建比例尺对象
            let scalebar = new this.getMap.Scalebar({
                map: this.map,
                scalebarStyle: 'line',
                scalebarUnit: 'metric', // 指定比例尺单位,有效值是"english(英制)" or "metric（公制）".默认"english"
                attachTo: 'bottom-left'
            });
            console.log("dojo.Color", dojo.Color)
            
            // 允许您使用Arcgis Server REST API公开的缓存映射服务资源。缓存的服务从缓存访问图块，
            // 而不是动态呈现图像。有关动态地图服务，请参阅DynamicMapServiceLayer
            const mapUrl = 'http://192.168.0.23:6080/arcgis/rest/services/GW_JCSJ_LF/MapServer'
            let layer = new this.getMap.ArcGISTiledMapServiceLayer(mapUrl);
            this.map.addLayer(layer);
            // 设置地图点击之后标记点的样式
            let pointSymbol = new this.getMap.SimpleMarkerSymbol( this.getMap.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
                              new this.getMap.SimpleLineSymbol( this.getMap.SimpleLineSymbol.STYLE_SOLID,
                              new dojo.Color([255, 0, 0]), 1),
                              new dojo.Color([255, 0, 0, 1])
                            );
      
            let that = this;
            this.map.on("click", (e) => {
                const { x, y } = e.mapPoint
                console.log(x)
                this.map.graphics.clear();
                this.map.graphics.add(new this.getMap.Graphic(e.mapPoint, pointSymbol));
                this.mapClick(e)
            });
            // 地图加载完成执行的事件
            this.map.on('load', (event) => {
                console.log("map init finished");
            });
            // 包含一个或多个图形功能的图层。默认情况下，每个映射都包含一个使用map.graphics属性访问的graphicsLayer。
            // 您可以创建自己的图形图层并将它们添加到地图中。图形图层可以在图形图层组中重新排序。
            // 但是，map.graphics中的图形层始终位于顶部。此外，所有图形层始终位于tiledmapServicelayers和dynamicmapServicelayers的顶部

            //创建stationList图层
            const pointLayer = new this.getMap.GraphicsLayer({ id: "pointLayer" });
            this.map.addLayer(pointLayer);
            
            //为图层添加点击事件
            this.pointLayer.on("click", (e) => {
                let graphic = e.graphic; //传输graphic对象
                this.showInfoWindow(graphic);
            });
        },
    },
    // 显示地图层上的弹框信息窗体
    showInfoWindow(graphic) {
        // popup是保存的全局地图对象中Popup的实例方法
        if (popup.isShowing) {
            if (this.lastFlowSheetId == graphic.attributes.id) {
              popup.hide();
            } else {
              popup.show(graphic.geometry);
              this.infoWindowByType(graphic);
              this.flowFlag = false
            }
            this.lastFlowSheetId = graphic.attributes.id   //记录上一次的markID
          } else {
              this.infoWindowByType(graphic)
        }
    },
}