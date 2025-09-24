class Database:
    def __init__(self, db_name):
        self.uri = os.getenv('MONGODB_URI')
        self.client = None
        self.db = None
        self.db_name = db_name

    def connect(self):
        for attempt in range(3):
            try:
                print(f"Attempting to connect to MongoDB (Attempt {attempt + 1})")
                quotaguard_url = os.getenv('QUOTAGUARDSTATIC_SOCKS5_URL')
                if quotaguard_url:
                    parsed = urlparse(quotaguard_url)
                    if parsed.scheme != 'socks5':
                        raise ValueError(f"Unsupported proxy scheme {parsed.scheme}")
                    socks.setdefaultproxy(
                        socks.PROXY_TYPE_SOCKS5,
                        parsed.hostname,
                        parsed.port,
                        True,
                        parsed.username,
                        parsed.password,
                    )
                    socket.socket = socks.socksocket  # monkey‑patch socket
                self.client = MongoClient(
                    self.uri,
                    serverSelectionTimeoutMS=30000,
                    socketTimeoutMS=30000,
                    tls=True,
                )
                self.db = self.client[self.db_name]
                self.client.admin.command('ping')  # verify connection
                print("MongoDB connection successful!")
                break
            except ServerSelectionTimeoutError as e:
                print(f"MongoDB connection failed on attempt {attempt + 1}: {e}")
                time.sleep(5)
            except Exception as e:
                print(f"MongoDB connection failed: {e}")
        if self.db is None:
            print("Failed to connect to MongoDB after 3 attempts")

    def get_db(self):
        if self.db is None:
            self.connect()
        return self.db
