# -*- mode: python ; coding: utf-8 -*-


block_cipher = None


a = Analysis(
    ['main.py','core/sampler.py','core/privacy_preserving.py','core/video_process.py','core/detect.py','core/blurring.py','core/cartooner.py', 'core/constant.py','core/mutils.py', 'core/protector.py','core/config.py','core/yolov5/detect.py','core/yolov5/export.py','core/yolov5/hubconf.py','core/yolov5/train.py','core/yolov5/val.py'],
    pathex=[],
    binaries=[],
    datas=[('core/yolov5','core/yolov5'), ('core/weights','core/weights'), ('gui','gui')],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='main',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    icon='./static/favicon.ico',
    upx=True,
    upx_exclude=[],
    name='main',
)
