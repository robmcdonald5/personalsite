#[derive(Error, Debug)]
pub enum VectorizeError {
    #[error("Image processing error: {0}")]
    ImageError(#[from] image::ImageError),
    #[error("Invalid configuration: {message}")]
    ConfigError { message: String },
    #[error("Algorithm error: {message}")]
    AlgorithmError { message: String },
    #[error("SVG generation error: {message}")]
    SvgError { message: String },
    #[error("Invalid image dimensions: width={width}, height={height}. {details}")]
    InvalidDimensions { width: u32, height: u32, details: String },
    #[error("Image too large: {width}x{height} exceeds maximum dimension {max_dimension}")]
    ImageTooLarge { width: u32, height: u32, max_dimension: u32 },
    #[error("Invalid color configuration: {details}")]
    InvalidColorConfig { details: String },
    #[error("Clustering failed: {details}")]
    ClusteringFailed { details: String },
    #[error("Memory limit exceeded: {details}")]
    MemoryLimitExceeded { details: String },
    #[error("Numerical overflow: {operation}")]
    NumericalOverflow { operation: String },
    #[error("Degenerate geometry: {details}")]
    DegenerateGeometry { details: String },
    // …more variants omitted for brevity…
}

impl VectorizeError {
    /// Construct specific error variants for easy use
    pub fn invalid_dimensions(width: u32, height: u32, details: impl Into<String>) -> Self {
        Self::InvalidDimensions { width, height, details: details.into() }
    }
    pub fn config_error(message: impl Into<String>) -> Self {
        Self::ConfigError { message: message.into() }
    }
    pub fn algorithm_error(message: impl Into<String>) -> Self {
        Self::AlgorithmError { message: message.into() }
    }
    // …additional constructors…
}
