#[derive(Subcommand)]
enum Commands {
    /// Vectorize using low-detail line tracing algorithm.
    ///
    /// Examples:
    ///   vectorize-cli trace-low input.png output.svg
    ///   vectorize-cli trace-low --backend dots --dot-density 0.05 --dot-size-range 0.3,1.0 input.png output.svg
    TraceLow {
        /// Input image file
        input: PathBuf,
        /// Output SVG file
        output: PathBuf,
        /// Tracing backend to use (edge, centerline, superpixel, dots)
        #[arg(long, default_value = "edge")]
        backend: String,
        /// Detail level (0.0 = very sparse, 1.0 = more detail)
        #[arg(long, default_value = "0.3")]
        detail: f32,
        /// Stroke width at 1080p reference resolution
        #[arg(long, default_value = "1.2")]
        stroke_width: f32,
        /// Random seed for reproducible results
        #[arg(long, default_value = "0")]
        seed: u64,
        /// Output statistics to CSV file
        #[arg(long)]
        stats: Option<PathBuf>,
        /// Enable dual-pass processing for enhanced quality
        #[arg(long)]
        multipass: bool,
        /// Enable reverse direction processing (R→L, B→T)
        #[arg(long)]
        enable_reverse: bool,
        /// Enable diagonal direction processing (NW→SE, NE→SW)
        #[arg(long)]
        enable_diagonal: bool,
        /// Maximum processing time budget in milliseconds
        #[arg(long, default_value = "1500")]
        max_time_ms: u64,
        /// Hand-drawn aesthetic preset (none, subtle, medium, strong, sketchy)
        #[arg(long, default_value = "none")]
        hand_drawn: String,
        /// Dot density threshold (0.0–1.0). Lower values produce more dots.
        #[arg(long, default_value = "0.1", help = "Dot density threshold (0.0-1.0). Lower=more dots")]
        dot_density: f32,
        /// Dot size range as "min,max" in pixels (e.g., "0.5,3.0")
        #[arg(long, default_value = "0.5,3.0", help = "Dot size range 'min,max' pixels (e.g. '0.5,3.0')")]
        dot_size_range: String,
        /// Preserve original pixel colors instead of black dots (pointillism effect)
        #[arg(long, help = "Preserve original pixel colors (creates colorful stippling)")]
        preserve_colors: bool,
        /// Use adaptive dot sizing based on local variance (default: true)
        #[arg(long, default_value = "true", value_parser = clap::value_parser!(bool), help = "Use adaptive sizing based on image variance")]
        adaptive_sizing: bool,
    }
}
