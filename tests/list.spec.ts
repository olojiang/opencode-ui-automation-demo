import { test, expect } from '@playwright/test';

/**
 * 列表操作测试套件
 * 测试目标: https://the-internet.herokuapp.com/tables
 */
test.describe('列表操作测试', () => {
  
  test('表格数据验证', async ({ page }) => {
    await page.goto('/tables');
    
    // 验证页面标题
    await expect(page.locator('h3')).toContainText('Data Tables');
    
    // 验证表格 1 存在
    const table1 = page.locator('#table1');
    await expect(table1).toBeVisible();
    
    // 验证表头
    const headers = table1.locator('thead th');
    await expect(headers).toHaveCount(6);
    await expect(headers.nth(0)).toContainText('Last Name');
    await expect(headers.nth(1)).toContainText('First Name');
    
    // 验证行数
    const rows = table1.locator('tbody tr');
    await expect(rows).toHaveCount(4);
    
    // 截图
    await page.screenshot({ path: 'screenshots/tables-data.png', fullPage: true });
  });

  test('表格排序功能', async ({ page }) => {
    await page.goto('/tables');
    
    const table1 = page.locator('#table1');
    
    // 点击 Last Name 列排序
    await table1.locator('th:has-text("Last Name")').click();
    
    // 验证第一行的数据
    const firstRow = table1.locator('tbody tr').first();
    await expect(firstRow.locator('td').nth(0))).toContainText('Bach');
    
    // 再次点击反向排序
    await table1.locator('th:has-text("Last Name")').click();
    
    // 验证第一行的数据变化
    await expect(firstRow.locator('td').nth(0))).toContainText('Smith');
    
    // 截图
    await page.screenshot({ path: 'screenshots/tables-sorting.png' });
  });

  test('可排序列表', async ({ page }) => {
    await page.goto('/sortable_data_tables');
    
    // 验证页面标题
    await expect(page.locator('h4')).toContainText('Editable');
    
    // 验证表格存在
    const table = page.locator('table');
    await expect(table).toBeVisible();
    
    // 截图
    await page.screenshot({ path: 'screenshots/sortable-tables.png' });
  });

  test('添加/删除元素', async ({ page }) => {
    await page.goto('/add_remove_elements/');
    
    // 验证页面标题
    await expect(page.locator('h3')).toContainText('Add/Remove Elements');
    
    // 点击 Add Element 按钮 3 次
    const addButton = page.locator('button:has-text("Add Element")');
    await addButton.click();
    await addButton.click();
    await addButton.click();
    
    // 验证有 3 个 Delete 按钮
    const deleteButtons = page.locator('button:has-text("Delete")');
    await expect(deleteButtons).toHaveCount(3);
    
    // 点击第一个 Delete 按钮
    await deleteButtons.first().click();
    
    // 验证剩下 2 个
    await expect(deleteButtons).toHaveCount(2);
    
    // 截图
    await page.screenshot({ path: 'screenshots/add-remove-elements.png' });
  });

  test('复选框列表', async ({ page }) => {
    await page.goto('/checkboxes');
    
    // 验证页面标题
    await expect(page.locator('h3')).toContainText('Checkboxes');
    
    // 获取所有复选框
    const checkboxes = page.locator('input[type="checkbox"]');
    await expect(checkboxes).toHaveCount(2);
    
    // 第一个复选框默认未选中，第二个默认选中
    await expect(checkboxes.nth(0))).not.toBeChecked();
    await expect(checkboxes.nth(1))).toBeChecked();
    
    // 勾选第一个
    await checkboxes.nth(0).check();
    await expect(checkboxes.nth(0))).toBeChecked();
    
    // 取消勾选第二个
    await checkboxes.nth(1).uncheck();
    await expect(checkboxes.nth(1))).not.toBeChecked();
    
    // 截图
    await page.screenshot({ path: 'screenshots/checkboxes.png' });
  });

});