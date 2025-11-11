package com.katech.ecodrive.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val DarkColorScheme = darkColorScheme(
    primary = PrimaryMain,
    onPrimary = BackgroundPrimary,
    primaryContainer = PrimaryDark,
    onPrimaryContainer = TextPrimary,
    
    secondary = SecondaryMain,
    onSecondary = BackgroundPrimary,
    secondaryContainer = SecondaryDark,
    onSecondaryContainer = TextPrimary,
    
    background = BackgroundPrimary,
    onBackground = TextPrimary,
    
    surface = BackgroundTertiary,
    onSurface = TextPrimary,
    
    error = AccentError,
    onError = TextPrimary,
    
    outline = BorderColor,
    outlineVariant = BackgroundElevated
)

@Composable
fun EcoDriveTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography = Typography,
        content = content
    )
}
