import type { Product } from './types';

// To add your own products, edit this list.
// - `name`: The name of your product.
// - `imageUrls`: A list of public URLs to the images for that product.
// The first image in the list will be used as the thumbnail in the selection grid.
export const PRODUCT_CATALOG: Product[] = [
  { 
    name: 'Lip Gloss',
    details: `Shades: Bare Blush (LG03) · Cinnamon Crush (LG02) · Brownie Bliss (LG05) · Coral Candy (LG04) · Pink Peony (LG01)

Details: Hydrating, high-shine lip gloss formula (non-sticky feel). Smooth glide-on finish with visible gloss; enriched to help condition lips while adding shine.

Benefits:
- Glossy, high-shine finish that enhances lip volume and highlights.
- Hydrating/conditioning feel — improves comfort vs. ordinary glosses.
- Non-sticky texture for easier everyday wear.
- Easy one-swipe application for quick touch-ups.`,
    imageUrls: [
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/OCTOBER/9/5gfnZXwX_172e39c82ba040b6b15d6b58fbb39788.jpg',
      'https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_75,w_1080/v1/assets/images/2025/OCTOBER/9/SG2clUIE_f5c2b7bacc7b4d7c921f74f9123f28d8.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/OCTOBER/9/HmDQ774z_c14f1266d5844d8893f8ef94284a972f.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/OCTOBER/9/8PNSNTL4_049ed8bf42624125b835ab70e39acdd8.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/OCTOBER/9/weA7nz5r_527bab3cc06f44c2a4264f97ea124695.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/OCTOBER/9/ZDkPmkAJ_f616a19a038642208876f8a11081ca1b.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/OCTOBER/9/v7I1jKwb_9dcd94c809b047d1b739ca5b809b9dff.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/Nu4HixaC_80195dd0e79f4573af9c528c0e9d70f6.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/H5yJaOZf_2fb3ae2b4f3d49428e7ba77d6213192a.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/PHNsPy9s_3934ae52a49f435e9323d941c4fb093a.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/qHJaXEvG_ddd936f4391445c9ae30057e98753f10.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/7F1vjie0_7369e31a2d3b4a73a0378fbc0dd64c1a.jpg',
      'https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_75,w_1080/v1/assets/images/2025/SEPTEMBER/25/JcaYldRA_659802a8f4c944f283196170ef2c51cb.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/mYH7UOQy_2539c08dde2e4fa3be3d90e176fdb465.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/16CesD47_7f34a6d5e83e4e3b9236bbd4f8f3929e.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/IeKFE1Y1_22437741b4684610beb4f940a303fc49.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/Uh8eLsh2_82bcc24c68a941d7a45dfd6f8a76e7c7.jpg',
      'https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_75,w_1080/v1/assets/images/2025/SEPTEMBER/25/l7txY4io_73cf49c68d514535a6b0e356be013398.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/uDemQohE_755025d0f492475eb0310757da8086b9.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/WiALSXi6_0ec64369185d41e6b4a3fdd2e4f4a147.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/wXLDsuZH_f7f9d5db281149928d4156f37acd7e0b.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/M9lNu4Nj_f04ee4d67c7c49fc94f0a4c3f98bac8b.jpg'
    ] 
  },
  {
    name: 'Lipstick',
    details: `Shades: Raw Rose (BL08) · Fudge Fix (BL09) · Petal Pookie (BL04) · Gem Girl (BL15) · Toffee Tint (BL06) · Berry Baddie (BL17) · Plum Poison (BL12) · Nude Nonsense (BL01) · Coral Chaos (BL07) · Risky Ruby (BL14) · Fuchsia Flirt (BL10) · Blush Bomb (BL02)

Details: High-pigment matte lipstick with long-wear claims and a lightweight feel. Designed to deliver bold colour while aiming for comfortable wear.

Benefits:
- Intense pigmentation for strong colour payoff.
- Matte finish for a polished, non-shiny look.
- Formulated to feel lightweight and reduce the drying effect common with mattes.
- Long-wearing — fewer touch-ups needed throughout the day.`,
    imageUrls: [
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/19/z35a4KiO_5230605ace864c5c88a9c6d99b04a2b9.jpg',
      'https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_75,w_1080/v1/assets/images/2025/SEPTEMBER/19/z35a4KiO_5230605ace864c5c88a9c6d99b04a2b9.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/22/GGNdjkoX_8606818d927a4b03b23ceee0723ec6e2.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/22/lDpJxWlr_9fcb1bd1492f4ae3ad5eed6570b106b0.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/22/4gerRNjf_b7ad24f5d561462d9cc4fcbaffce7461.jpg',
      'https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_75,w_1080/v1/assets/images/2025/SEPTEMBER/25/tEjbM33q_2f440833fba543ffa87954c8a3ef9222.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/xmoNjKOF_0a72eb1c33e840d28a25135c2eaec138.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/sAnD2hUK_97d8600151944089b0c98d94d88a236a.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/6nM34Ftw_978aa9765c0b41f99b047c87bb73fdba.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/26/CC7lmlXz_2343e868c2974e5db78668740ca34833.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/SKqpFBUk_b67c8b00c4214331bca420c57c69e6c0.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/25/5MSK6II0_97786cd131074461ba227a1e6264c759.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/OCTOBER/9/Jzc2sSTi_d7152c2cc99245ca85b1344cc509434f.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/OCTOBER/9/j9VmSgXJ_2bb62af47b6e4c7c9d7f5732a2eb6776.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/OCTOBER/9/zGcBwYdo_5ead345e84a24784abd995e3679f87ff.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/24/qrTjVKhq_689c855fe0c44375a24d95331d10e839.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/22/Nr1bpXmR_c60bb91d40ff47969f77c134a5e6ee75.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/22/EscErVmv_079827b05ff647fca01fb9aa35798a6e.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/23/YNCET1jI_d825c590b5a5412d9a0ec66e373276ac.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/22/UuUYPT93_9c08bd3bf3694c1d8159868056f7d761.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/22/4e83Gs70_7651474cb0f0491980a717a24fc773d2.jpg'
    ]
  },
  {
    name: 'Lip & Cheek Tint',
    details: `Shades: Sunset Slush (WT01) · Cosmo Craze (WT02) · Cherry Crush (WT03) · Berry Brew (WT04)

Details: Water-stain style tint formulated for dual use on lips and cheeks. Lightweight, buildable colour that gives a natural flushed look.

Benefits:
- Dual-use product simplifies kit — matches lip and cheek colour easily.
- Water-stain finish provides a natural, long-lasting flush without heavy texture.
- Lightweight and buildable — can go sheer or more intense as needed.
- Convenient for quick, minimal makeup routines.`,
    imageUrls: [
      'https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_75,w_1080/v1/assets/images/2025/NOVEMBER/17/KaXho2Bn_20fa8d60e7bb46a390ac1012fed23183.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/17/2Yaf8lEc_a7e9e5f3e59d4b39a0a22054a35d0f87.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/17/PXPASAUP_42c6cbcab60e437285f43915ceec99e2.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/17/czPKJeJx_fdaffcde8b6a4a6a911710cbeebbdc05.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/17/AQWnzxye_7f684089d327466c86ab454516bbb9d8.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/17/5e6uY771_bfedb662405a476bad670f39656302e5.jpg',
      'https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_75,w_1080/v1/assets/images/2025/NOVEMBER/14/lCqMsPe5_3cdecf127ef94a9fbe7ba045902309a8.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/14/WWDhEdbe_8415467f6f56443f8df9fd59e57b1136.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/14/tjnDZ9ei_b4ffbb70c9ea480eb790352a5ad4e66f.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/14/MH2KNPeq_42079c81316d4cfd889fcc6e1346c75d.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/17/rZn2exfe_d3c61185a851424d889475c253d806dc.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/17/fSzN7W36_97722a4c79154beea52234f29877efa5.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/17/jHilCWMt_a0749fe9b34a470da9871ea5a34e0bc8.jpg'
    ]
  },
  {
    name: 'Kajal',
    details: `Shades: Eclipse (K1) · Forest (K2) · Sapphire (K3) · Cosmic (K4) · Candy (K5)

Details: Classic kajal/eye liner formulation for defining eyes. Typically used to create sharp or smudged looks depending on application.

Benefits:
- Defines and intensifies the eyes; works for both subtle and dramatic looks.
- Usually easy to apply and blend for smoky effects.
- Good for quick eye-makeup touch-ups and layering.`,
    imageUrls: [
      'https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_75,w_1080/v1/assets/images/2025/NOVEMBER/12/vNWcwSPa_57c8389104ba4847975d167b310dae8e.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/12/Sug1CmYK_2b9e024200f84785a4788b442780134b.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/13/kqgXIO1y_dfc015bd654048d9b2e3d3321cf50605.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/OCTOBER/30/b3VR95Rt_35c95fbf193a47c8875ebc18f0be6e66.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/12/l7Dx6no4_1427bce6b51e40f1a076114d5e932654.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/13/qIpVWRtQ_d576deced6494e33b4b75946ea142b90.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/13/c4hfwY7b_adcbe968f787426e9c9c1bf74958e379.jpg',
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/NOVEMBER/12/sjqW0z0u_2411b52c89f54f4182fced28fe468a82.jpg'
    ]
  },
];