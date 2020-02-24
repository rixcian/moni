import psutil, sys, json, time

def getSysData():
  cpus_percentage = psutil.cpu_percent(interval = 1, percpu=True)
  
  jsonData = {
    "cpu": {
      "count": psutil.cpu_count(),
      "percentage_usage": cpus_percentage
    },
    "memory": {
      "total": round((psutil.virtual_memory().total / (10 ** 9)), 2),
      "used": round((psutil.virtual_memory().used / (10 ** 9)), 2),
      "free": round((psutil.virtual_memory().free / (10 ** 9)), 2),
      "swap": {
        "total": round((psutil.swap_memory().total / (10 ** 9)), 2),
        "used": round((psutil.swap_memory().used / (10 ** 9)), 2),
        "free": round((psutil.swap_memory().free / (10 ** 9)), 2),
      }
    },
    "drives": {
      "total": round(psutil.disk_usage('/').total / (10 ** 9), 2),
      "used": round(psutil.disk_usage('/').used / (10 ** 9), 2),
      "free": round(psutil.disk_usage('/').free / (10 ** 9), 2),
      #"partitions": psutil.disk_partitions()
    },
    "network": {
      "sent": psutil.net_io_counters().bytes_sent,
      "received": psutil.net_io_counters().bytes_recv,
      "net_connections": psutil.net_connections()
    }
  }
  
  print(json.dumps(jsonData, sort_keys=True))
  sys.stdout.flush()

while True:
  getSysData()
  time.sleep(int(sys.argv[1]))
  