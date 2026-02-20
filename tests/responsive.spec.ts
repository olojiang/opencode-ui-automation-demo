import { test, expect } from '@playwright/test';

/**
 * 响应式布局测试套件
 * 测试不同视口尺寸下的页面表现
 */
test.describe('响应式布局测试', () => {
  
  test('桌面端视口 (1920x1080)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // 验证页面正常加载
    await expect(page.locator('h1')).toContainText('Welcome to the-internet');
    
    // 截图
    await page.screenshot({ 
      path: 'screenshots/responsive-desktop-1920x1080.png',
      fullPage: true 
    });
    
    await context.close();
  });

  test('笔记本视口 (1366x768)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1366, height: 768 }
    });
    const page = await context.newPage();
    
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Welcome to the-internet');
    
    await page.screenshot({ 
      path: 'screenshots/responsive-laptop-1366x768.png',
      fullPage: true 
    });
    
    await context.close();
  });

  test('iPad 横屏 (1024x768)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1024, height: 768 },
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X)'
    });
    const page = await context.newPage();
    
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Welcome to the-internet');
    
    await page.screenshot({ 
      path: 'screenshots/responsive-ipad-landscape.png',
      fullPage: true 
    });
    
    await context.close();
  });

  test('iPad 竖屏 (768x1024)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 768, height: 1024 },
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X)'
    });
    const page = await context.newPage();
    
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Welcome to the-internet');
    
    await page.screenshot({ 
      path: 'screenshots/responsive-ipad-portrait.png',
      fullPage: true 
    });
    
    await context.close();
  });

  test('iPhone 14 Pro Max (430x932)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 430, height: 932 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)'
    });
    const page = await context.newPage();
    
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Welcome to the-internet');
    
    await page.screenshot({ 
      path: 'screenshots/responsive-iphone-14promax.png',
      fullPage: true 
    });
    
    await context.close();
  });

  test('iPhone SE (375x667)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)'
    });
    const page = await context.newPage();
    
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Welcome to the-internet');
    
    await page.screenshot({ 
      path: 'screenshots/responsive-iphone-se.png',
      fullPage: true 
    });
    
    await context.close();
  });

  test('页面元素在不同视口下的可见性', async ({ browser }) => {
    // 桌面端
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('/');
    
    // 验证所有链接可见
    const links = desktopPage.locator('ul li a');
    await expect(links).toHaveCount(44); // 总共44个示例链接
    
    await desktopPage.screenshot({ 
      path: 'screenshots/responsive-all-links-desktop.png',
      fullPage: true 
    });
    
    await desktopContext.close();
    
    // 移动端
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 }
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('/');
    
    await mobilePage.screenshot({ 
      path: 'screenshots/responsive-all-links-mobile.png',
      fullPage: true 
    });
    
    await mobileContext.close();
  });

});