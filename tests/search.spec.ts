import { test, expect } from '@playwright/test';

/**
 * 搜索功能测试套件
 * 测试目标: https://the-internet.herokuapp.com
 */
test.describe('搜索功能测试', () => {
  
  test('页面内搜索 - 动态控制', async ({ page }) => {
    await page.goto('/dynamic_controls');
    
    // 验证页面标题
    await expect(page.locator('h4')).toContainText('Dynamic Controls');
    
    // 验证复选框存在
    const checkbox = page.locator('#checkbox input');
    await expect(checkbox).toBeVisible();
    
    // 点击 Remove 按钮
    await page.click('button:has-text("Remove")');
    
    // 等待加载完成
    await page.waitForSelector('#checkbox input', { state: 'detached', timeout: 10000 });
    
    // 验证 "It's gone!" 消息
    await expect(page.locator('#message')).toContainText("It's gone!");
    
    // 点击 Add 按钮
    await page.click('button:has-text("Add")');
    
    // 等待复选框重新出现
    await page.waitForSelector('#checkbox input', { state: 'visible', timeout: 10000 });
    
    // 验证 "It's back!" 消息
    await expect(page.locator('#message')).toContainText("It's back!");
    
    // 截图
    await page.screenshot({ path: 'screenshots/dynamic-controls.png', fullPage: true });
  });

  test('下拉菜单选择', async ({ page }) => {
    await page.goto('/dropdown');
    
    // 验证页面标题
    await expect(page.locator('h3')).toContainText('Dropdown List');
    
    // 选择 Option 1
    await page.selectOption('#dropdown', '1');
    await expect(page.locator('#dropdown')).toHaveValue('1');
    
    // 选择 Option 2
    await page.selectOption('#dropdown', '2');
    await expect(page.locator('#dropdown')).toHaveValue('2');
    
    // 截图
    await page.screenshot({ path: 'screenshots/dropdown.png' });
  });

  test('悬浮菜单', async ({ page }) => {
    await page.goto('/hovers');
    
    // 验证页面标题
    await expect(page.locator('h3')).toContainText('Hovers');
    
    // 获取所有图片
    const figures = page.locator('.figure');
    await expect(figures).toHaveCount(3);
    
    // 悬浮到第一个图片上
    await figures.nth(0).hover();
    
    // 验证悬浮后显示的信息
    const caption = figures.nth(0).locator('.figcaption');
    await expect(caption).toBeVisible();
    await expect(caption).toContainText('user1');
    
    // 截图
    await page.screenshot({ path: 'screenshots/hovers.png' });
  });

  test('拖拽功能', async ({ page }) => {
    await page.goto('/drag_and_drop');
    
    // 验证页面标题
    await expect(page.locator('h3')).toContainText('Drag and Drop');
    
    // 获取两个元素
    const columnA = page.locator('#column-a');
    const columnB = page.locator('#column-b');
    
    // 验证初始文本
    await expect(columnA.locator('header'))).toContainText('A');
    await expect(columnB.locator('header'))).toContainText('B');
    
    // 拖拽 A 到 B
    await columnA.dragTo(columnB);
    
    // 验证交换后的文本
    await expect(columnA.locator('header'))).toContainText('B');
    await expect(columnB.locator('header'))).toContainText('A');
    
    // 截图
    await page.screenshot({ path: 'screenshots/drag-and-drop.png' });
  });

  test('文件上传', async ({ page }) => {
    await page.goto('/upload');
    
    // 验证页面标题
    await expect(page.locator('h3')).toContainText('File Uploader');
    
    // 选择文件上传（使用一个临时文件路径）
    const fileInput = page.locator('input[type="file"]');
    
    // 创建一个测试文件
    const testFilePath = '/tmp/test-upload.txt';
    await page.evaluate((path) => {
      const fs = require('fs');
      fs.writeFileSync(path, 'This is a test file for upload');
    }, testFilePath);
    
    // 上传文件
    await fileInput.setInputFiles(testFilePath);
    
    // 点击上传按钮
    await page.click('#file-submit');
    
    // 验证上传成功页面
    await expect(page.locator('h3'))).toContainText('File Uploaded!');
    
    // 截图
    await page.screenshot({ path: 'screenshots/file-upload.png' });
  });

});