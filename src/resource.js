var res = {
    map_tmx: "res/empty.tmx",
    terrain_png: "res/terrain.png",
    terrain_tsx: "res/terrain.tsx",
    objs_plist: "res/obj/objs.plist",
    objs_png: "res/obj/objs.png",
    sprites_characters_male_walkcycle_plist: "res/obj/sprites/characters/male_walkcycle.plist",
    sprites_characters_male_walkcycle_animation_plist: "res/obj/sprites/characters/male_walkcycle_animation.plist",
    sprites_characters_male_walkcycle_png: "res/obj/sprites/characters/male_walkcycle.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
