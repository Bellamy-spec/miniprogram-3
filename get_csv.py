"""调用API获取csv实验数据"""
import requests
import sys

# 读取命令行输入的文件名
fn = sys.argv[1]

# 获取响应
url = 'http://zz106gz.cn/api/test_csv'
r = requests.get(url)

if r.status_code == 200:
    r.encoding = 'utf-8'
    with open(fn, 'wb') as f:
        f.write(r.text.encode('utf-8'))
