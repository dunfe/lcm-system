import React from 'react';

export const Nav00DataSource = {
  wrapper: { className: 'header0 home-page-wrapper kkzlqwvqdyg-editor_css' },
  page: { className: 'home-page' },
  logo: {
    className: 'header0-logo kkzlbyayrio-editor_css',
    children: 'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619186953/logo/No_target_line_hlhrqn.svg',
  },
  Menu: {
    className: 'header0-menu kkzltbs73i9-editor_css',
    children: [
      {
        name: 'item0',
        className: 'header0-item',
        children: {
          href: 'https://app.livecoding.me/become-mentor',
          children: [{ children: 'Trở thành người hướng dẫn', name: 'text' }],
        },
      },
      {
        name: 'item1',
        className: 'header0-item',
        children: {
          href: '#Feature8_0',
          children: [{ children: 'Cách thức hoạt động', name: 'text' }],
        },
      },
      {
        name: 'item2',
        className: 'header0-item',
        children: {
          href: '#Feature2_0',
          children: [{ children: 'Tại chọn chúng tôi?', name: 'text' }],
        },
      },
      {
        name: 'item3',
        className: 'header0-item',
        children: {
          href: 'https://app.livecoding.me',
          children: [{ children: 'Đăng nhập', name: 'text' }],
        },
      },
    ],
  },
  mobileMenu: { className: 'header0-mobile-menu' },
};
export const Banner50DataSource = {
  wrapper: { className: 'home-page-wrapper banner5 kkzlw5dcbro-editor_css' },
  page: { className: 'home-page banner5-page' },
  childWrapper: {
    className: 'banner5-title-wrapper',
    children: [
      {
        name: 'title',
        children: 'Ở đây chúng tôi giúp bạn xử lý các vấn đề về lập trình',
        className: 'banner5-title kkzlx1xo2dr-editor_css',
      },
      {
        name: 'explain',
        className: 'banner5-explain',
        children: 'vấn đề của bạn là trách nhiệm của chúng tôi',
      },
      {
        name: 'button',
        className: 'banner5-button-wrapper',
        children: {
          href: 'https://app.livecoding.me/',
          className: 'banner5-button',
          type: 'primary',
          children: 'Đặt câu hỏi ngay',
        },
      },
    ],
  },
  image: {
    className: 'banner5-image',
    children:
      'https://res.cloudinary.com/dungnqhe151250/image/upload/v1613382349/Mesa_de_trabajo_1_4x_ig60oh.png',
  },
};
export const Feature80DataSource = {
  wrapper: { className: 'home-page-wrapper feature8-wrapper' },
  page: { className: 'home-page feature8' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'feature8-title-wrapper',
    children: [
      { name: 'title', className: 'feature8-title-h1', children: 'Cách thức hoạt động' },
    ],
  },
  childWrapper: {
    className: 'feature8-button-wrapper',
    children: [
      {
        name: 'button',
        className: 'feature8-button',
        children: { href: 'https://app.livecoding.me/login', children: 'Đăng ký ngay' },
      },
    ],
  },
  Carousel: {
    dots: false,
    className: 'feature8-carousel',
    wrapper: { className: 'feature8-block-wrapper' },
    children: {
      className: 'feature8-block',
      titleWrapper: {
        className: 'feature8-carousel-title-wrapper',
        title: { className: 'feature8-carousel-title' },
      },
      children: [
        {
          name: 'block0',
          className: 'feature8-block-row',
          gutter: 120,
          children: [
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child0',
              arrow: {
                className: 'feature8-block-arrow',
                children:
                  'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children:
                      'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619891564/edit_pbzehw.svg',
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: 'Đăng ký tài khoản',
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children: 'Bắt đầu bằng việc đăng ký tài khoản một cách nhanh chóng.',
                  },
                ],
              },
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child1',
              arrow: {
                className: 'feature8-block-arrow',
                children:
                  'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children:
                      'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619891813/paper-plane_iy1gnk.svg',
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: 'Tạo câu hỏi',
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children:
                      'Chia sẻ khó khăn mà bạn cần trợ giúp.',
                  },
                ],
              },
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child2',
              arrow: {
                className: 'feature8-block-arrow',
                children:
                  'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children:
                      'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619891987/magnifying-glass_fbabed.svg',
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: 'Matching',
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children:
                      'Ghép cặp với giảng viên sẵn sàng giải đáp giúp bạn.',
                  },
                ],
              },
            },
            {
              className: 'feature8-block-col',
              md: 6,
              xs: 24,
              name: 'child3',
              arrow: {
                className: 'feature8-block-arrow',
                children:
                  'https://gw.alipayobjects.com/zos/basement_prod/167bee48-fbc0-436a-ba9e-c116b4044293.svg',
              },
              children: {
                className: 'feature8-block-child',
                children: [
                  {
                    name: 'image',
                    className: 'feature8-block-image',
                    children:
                      'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619892073/chat_r2zyho.svg',
                  },
                  {
                    name: 'title',
                    className: 'feature8-block-title',
                    children: 'Giải quyết vấn đề',
                  },
                  {
                    name: 'content',
                    className: 'feature8-block-content',
                    children:
                      'Trao đổi vấn đề trực tiếp với đội ngũ mentor.',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  },
};
export const Feature20DataSource = {
  titleWrapper: {
    className: 'feature8-title-wrapper',
    children: [
      { name: 'title', className: 'feature8-title-h1', children: 'Tại sao chọn chúng tôi?' },
    ],
  },
  wrapper: { className: 'home-page-wrapper content2-wrapper' },
  OverPack: { className: 'home-page content2', playScale: 0.3 },
  imgWrapper: { className: 'content2-img', md: 10, xs: 24 },
  img: {
    children: 'https://res.cloudinary.com/dungnqhe151250/image/upload/v1613382347/Asset_2_4x_rahj54.png',
  },
  textWrapper: { className: 'content2-text', md: 14, xs: 24 },
  title: { className: 'content2-title', children: 'Giải quyết vấn đề' },
  content: {
    className: 'content2-content',
    children:
      'Sau khi bạn chia sẻ những khó khăn gặp phải, hệ thống sẽ giúp bạn kết nối với giảng viên để cùng nhau giải đáp chi tiết.',
  },
};
export const Feature10DataSource = {
  wrapper: { className: 'home-page-wrapper content1-wrapper' },
  OverPack: { className: 'home-page content1', playScale: 0.3 },
  imgWrapper: { className: 'content1-img', md: 10, xs: 24 },
  img: {
    children: 'https://res.cloudinary.com/dungnqhe151250/image/upload/v1613382348/Asset_4_4x_ysacku.png',
  },
  textWrapper: { className: 'content1-text', md: 14, xs: 24 },
  title: { className: 'content1-title', children: 'Xử lí nhanh gọn' },
  content: {
    className: 'content1-content',
    children:
      'Với công nghệ hỗ trợ 2 người đồng thời cùng code trên 1 cửa sổ (Collaborative coding), kết hợp cùng video call, chia sẻ màn hình và chat trên cùng 1 session, chúng tôi sẵn sàng hỗ trợ bạn và giảng viên giải quyết câu hỏi một cách tiện lợi và nhanh chóng.',
  },
};
export const Feature21DataSource = {
  wrapper: { className: 'home-page-wrapper content2-wrapper' },
  OverPack: { className: 'home-page content2', playScale: 0.3 },
  imgWrapper: { className: 'content2-img', md: 10, xs: 24 },
  img: {
    children: 'https://res.cloudinary.com/dungnqhe151250/image/upload/v1613382347/Asset_1_4x_aljhjw.png',
  },
  textWrapper: { className: 'content2-text', md: 14, xs: 24 },
  title: { className: 'content2-title', children: 'Đội ngũ chuyên nghiệp' },
  content: {
    className: 'content2-content',
    children:
      'Chất lượng giảng viên được sàng lọc, đánh giá vô cùng gắt gao trước khi trở thành người hướng dẫn cho bạn',
  },
};
export const Content10DataSource = {
  wrapper: { className: 'home-page-wrapper content1-wrapper' },
  OverPack: { className: 'home-page content1', playScale: 0.3 },
  imgWrapper: { className: 'content1-img', md: 10, xs: 24 },
  img: {
    children: 'https://res.cloudinary.com/dungnqhe151250/image/upload/v1613382348/Asset_3_4x_izmhrk.png',
  },
  textWrapper: { className: 'content1-text', md: 14, xs: 24 },
  title: { className: 'content1-title', children: 'Giá cả hợp lí' },
  content: {
    className: 'content1-content',
    children:
      'Mức phí thanh toán cho câu hỏi sẽ do bạn toàn quyền quyết định và chỉnh sửa.',
  },
};
export const Teams10DataSource = {
  wrapper: { className: 'home-page-wrapper teams1-wrapper' },
  page: { className: 'home-page teams1' },
  OverPack: { playScale: 0.25, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: 'Ý kiến người dùng' }],
  },
  block: {
    className: 'block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'block',
        md: 6,
        xs: 24,
        titleWrapper: {
          children: [
            {
              name: 'image',
              className: 'teams1-image',
              children:
                'https://res.cloudinary.com/dungnqhe151250/image/upload/v1620153886/131999275_1144664649300799_2052705464649846513_n_ciurnr.jpg',
            },
            { name: 'title', className: 'teams1-title', children: 'Nguyễn Mạnh Cường' },
            {
              name: 'content',
              className: 'teams1-job',
              children: 'VinID Full-stack Developer',
            },
            {
              name: 'content1',
              className: 'teams1-content',
              children:
                'Với một giao diện dễ dùng và thân thiện, ứng dụng web này rất hữu ích giúp các bạn học sinh, sinh viên hay mọi người gặp khó khăn trong việc học code. Đặc biệt là phần real-time collaborative editor giúp ích rất nhiều cho các bạn sinh viên về các vấn đề mình gặp phải, để từ đó hiểu kĩ hơn về bản chất vấn đề nhờ có sự giúp đỡ của đội ngũ Mentor rất chất lượng.',
            },
          ],
        },
      },
      {
        name: 'block1',
        className: 'block',
        md: 6,
        xs: 24,
        titleWrapper: {
          children: [
            {
              name: 'image',
              className: 'teams1-image',
              children:
                'https://res.cloudinary.com/dungnqhe151250/image/upload/v1620083177/image0_tikfhh.jpg',
            },
            { name: 'title', className: 'teams1-title', children: 'Nguyễn Bá Sơn' },
            {
              name: 'content',
              className: 'teams1-job',
              children: 'Thành viên SAP LAB trường ĐH FPT',
            },
            {
              name: 'content1',
              className: 'teams1-content',
              children:
                'Web có hỗ trợ IDE và có thể gọi video, rất hữu ích cho việc giải đáp các câu hỏi.',
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'block',
        md: 6,
        xs: 24,
        titleWrapper: {
          children: [
            {
              name: 'image',
              className: 'teams1-image',
              children:
                'https://res.cloudinary.com/dungnqhe151250/image/upload/v1620083159/image0_iaetnn.jpg',
            },
            { name: 'title', className: 'teams1-title', children: 'Nguyễn Hoàng Sơn' },
            {
              name: 'content',
              className: 'teams1-job',
              children: 'Thành viên SAP LAB trường ĐH FPT',
            },
            {
              name: 'content1',
              className: 'teams1-content',
              children:
                'Web có giao diện thân thiện, có thể đặt câu hỏi với nhiều ngôn ngữ lập trình.',
            },
          ],
        },
      },
      {
        name: 'block3',
        className: 'block',
        md: 6,
        xs: 24,
        titleWrapper: {
          children: [
            {
              name: 'image',
              className: 'teams1-image',
              children:
                'https://res.cloudinary.com/dungnqhe151250/image/upload/v1620083144/image0_p75vc3.jpg',
            },
            { name: 'title', className: 'teams1-title', children: 'Đoàn Văn Thắng' },
            {
              name: 'content',
              className: 'teams1-job',
              children: 'Thành viên SAP LAB trường ĐH FPT',
            },
            {
              name: 'content1',
              className: 'teams1-content',
              children:
                'Thiết kế trang web đẹp,  phần real-time collaborative editor khá hữu ích',
            },
          ],
        },
      },
    ],
  },
};
export const Footer10DataSource = {
  wrapper: { className: 'home-page-wrapper footer1-wrapper' },
  OverPack: { className: 'footer1', playScale: 0.2 },
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block1',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'Trang chủ' },
        childWrapper: {
          children: [
            { name: 'link0', href: 'https://app.livecoding.me/become-mentor', children: 'Trở thành người hướng dẫn' },
            { name: 'link1', href: '#Feature8_0', children: 'Cách hoạt động' },
            { name: 'link2', href: '#Feature2_0', children: 'Tại sao chọn chúng tôi' },
            { name: 'link3', href: '#Teams1_0', children: 'Ý kiến người dùng' },
          ],
        },
      },
      {
        name: 'block2',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'Ngôn ngữ' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'Tiếng Việt' },
            { href: '#', name: 'link1', children: 'Tiếng Anh' },
          ],
        },
      },
      {
        name: 'block3',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'Điều khoản & Chính sách' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'Điều khoản sử dụng' },
            { href: '#', name: 'link1', children: 'Chính sách ứng dụng' },
          ],
        },
      },
      {
        name: 'block0',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          className: 'logo',
          children:
            'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619186953/logo/Logo2_xnkzp1.svg',
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'content0',
              children: '',
            },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page' },
  copyright: {
    className: 'copyright',
    children: (
      <span>
        ©2021 by
        {' '}
        <a href="https://app.livecoding.me">LCM</a>
        {' '}
        All Rights
        Reserved
      </span>
    ),
  },
};
